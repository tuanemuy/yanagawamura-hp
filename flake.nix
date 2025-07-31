{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    systems.url = "github:nix-systems/default";
  };

  outputs =
    {
      self,
      nixpkgs,
      systems,
    }:
    let
      mapSupportedSystems = nixpkgs.lib.genAttrs (import systems);
      forEachSupportedSystem = f: mapSupportedSystems (system: f nixpkgs.legacyPackages.${system});
    in
    {
      devShells = forEachSupportedSystem (pkgs: {
        default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_22
            vtsls
            biome
          ];
        };
      });
    };
}
