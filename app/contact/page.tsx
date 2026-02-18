const page = () => {
  return (
    <section className="bg-[#3838F9] min-h-screen relative isolate ">
      <div
        className="absolute -top-1/6 -left-1/7 w-1/2 2xl:blur-none blur-xl h-[120%] bg-cover bg-no-repeat -z-10 animate-rays"
        style={{ backgroundImage: "url(/hero-rays.png)" }}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(180deg,_rgba(0,0,0,1)_0%,_rgba(56,56,249,1)_100%)] -z-10" />
      <div className="container"></div>
    </section>
  );
};

export default page;
