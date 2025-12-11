from pathlib import Path

p = Path(".") / "components"

out = ""
for file in sorted(p.glob("**/*.tsx")):
    if file.stem == "index":
        continue
    elif file.stem == "ModalContext":
        out += f"export {{ {file.stem}, useModals }} from './{file.relative_to(p).with_suffix('')}';\n"
        continue
    out += f"export {{ default as {file.stem} }} from './{file.relative_to(p).with_suffix('')}';\n"

with (p / "index.tsx").open("w") as f:
    f.write(out)
