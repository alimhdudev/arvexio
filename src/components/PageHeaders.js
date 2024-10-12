export default function PageHeaders({
  h1Text = 'Hello',
}) {
  return (
    <section className="text-center mt-6 sm:mt-12 mb-4 sm:mb-8">
      <h1 className="text-red-500 font-bold text-xl sm:text-3xl">
        {h1Text}
      </h1>
    </section>
  );
}