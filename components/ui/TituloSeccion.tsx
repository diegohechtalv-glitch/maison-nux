import Reveal from "./Reveal";

export default function TituloSeccion({
  children,
  centrado = false,
}: {
  children: React.ReactNode;
  centrado?: boolean;
}) {
  return (
    <Reveal className={centrado ? "centrado text-center" : ""}>
      <h2 className="text-3xl md:text-4xl">{children}</h2>
      <span className="filete" aria-hidden="true" />
    </Reveal>
  );
}
