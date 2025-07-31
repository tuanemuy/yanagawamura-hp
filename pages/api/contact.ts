import { createTransport } from "nodemailer";
import type { SendMailOptions } from "nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";

const transport = createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function send(options: SendMailOptions) {
  const result = await transport.sendMail(options);
  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
}

type Result = {
  isSuccess: boolean;
  error: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>,
) {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);

    const { isSuccess, error } = await handlePost(body);

    if (isSuccess) {
      res.status(200).json({ isSuccess: true, error: null });
    } else {
      res.status(500).json({ isSuccess: false, error });
    }
  } else if (req.method === "GET" || req.method === "HEAD") {
    res.status(404).json({ isSuccess: false, error: "Not Found" });
  } else {
    res.status(405).json({ isSuccess: false, error: "Method Not Allowed" });
  }
}

type FormFields = {
  name: string;
  email: string;
  tel: string;
  address: string;
  content: string;
};

async function handlePost(body: FormFields): Promise<Result> {
  try {
    const result = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET || "",
        "x-hasura-role": "admin",
      },
      body: JSON.stringify({
        query: `
mutation CreateContact(
  $name: String!
  $email: String!
  $tel: String
  $address: String!
  $content: String!
) {
  insert_post_one(
    object: {
      title: $name
      post_type_id: ${process.env.CONTACT_POST_TYPE_ID || ""}
      category_id: ${process.env.DEFAULT_CONTACT_CATEGORY_ID || ""}
      revisions: {
        data: {
          values: {
            data: [
              {
                field_id: ${process.env.CONTACT_EMAIL_FIELD_ID},
                text: {
                  data: {
                    body: $email
                  }
                }
              },
              {
                field_id: ${process.env.CONTACT_TEL_FIELD_ID},
                text: {
                  data: {
                    body: $tel
                  }
                }
              },
              {
                field_id: ${process.env.CONTACT_ADDRESS_FIELD_ID},
                text: {
                  data: {
                    body: $address
                  }
                }
              },
              {
                field_id: ${process.env.CONTACT_CONTENT_FIELD_ID},
                text: {
                  data: {
                    body: $content
                  }
                }
              }
            ]
          }
        }
      }
    }
  ) {
    id
  }
}
        `,
        variables: body,
      }),
    });
    const { errors } = await result.json();

    if (errors) {
      throw new Error("Failed to insert.");
    }
  } catch (e) {
    return {
      isSuccess: false,
      error: "Failed to insert.",
    };
  }

  try {
    const sendMails = [
      send({
        to: `${body.name} <${body.email}>`,
        from: `ヤナガワ村役場 <${process.env.CONTACT_MAIL_FROM}>`,
        subject: "お問い合わせありがとうございます【ヤナガワ村役場】",
        text: `
この度はヤナガワ村役場にお問い合わせくださり、誠にありがとうございます。
返信があるまで今しばらくお待ちください。

== お問い合わせ内容 ===============

お名前： ${body.name}
メールアドレス： ${body.email}
電話番号： ${body.tel || ""}
ご住所： ${body.address}
お問い合わせ内容：
${body.content}

==============================

- - - - - - - - - - - - - - - - - - - - - - - - - -

ヤナガワ村役場
Email: ${process.env.CONTACT_NOTIFY_TO || ""}
      `,
      }),
      send({
        to: process.env.CONTACT_NOTIFY_TO || "",
        from: `ヤナガワ村役場 <${process.env.CONTACT_MAIL_FROM}>`,
        subject: "ホームページから問い合わせがありました",
        text: `
ヤナガワ村役場ホームページから以下の内容で問い合わせがありました。

== 問い合わせ内容 ===============

氏名： ${body.name}
メールアドレス： ${body.email}
電話番号： ${body.tel || ""}
住所： ${body.address}
問い合わせ内容：
${body.content}

==============================

- - - - - - - - - - - - - - - - - - - - - - - - - -

ヤナガワ村役場
Email: ${process.env.CONTACT_NOTIFY_TO || ""}
      `,
      }),
    ];

    await Promise.all(sendMails);

    return {
      isSuccess: true,
      error: null,
    };
  } catch (e) {
    return {
      isSuccess: false,
      error: "Failed to send mail.",
    };
  }
}
