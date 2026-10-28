# MuniHac 2026: GHC's WebAssembly backend in nixpkgs

The slides of the MuniHac 2026 lightning talk, as built:
<https://purefunsolutions.github.io/nix-ghc-wasm-flake-munihac2026/>

The slides are themselves a Haskell program, compiled by GHC 9.14.1's WebAssembly backend in a
pure Nix build. This repository only holds that build: the output of
`nix build .#munihac2026presentation` in
[nix-ghc-wasm-flake](https://github.com/purefunsolutions/nix-ghc-wasm-flake) on 2026-10-28,
on x86_64-linux, with nixpkgs from the `ghc-wasm-flake-20261028b` branch of
[mikatammi/nixpkgs](https://github.com/mikatammi/nixpkgs). `index.html` has everything inlined,
so it also works when opened as a local file.
