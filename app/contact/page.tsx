import Pill from "@/components/ui/pill";

const page = () => {
  return (
    <section className="bg-[#3838F9] min-h-screen relative isolate pt-60.5 ">
      <div
        className="absolute -top-1/6 -left-1/7 w-1/2 2xl:blur-none blur-xl h-[120%] bg-cover bg-no-repeat -z-10 animate-rays"
        style={{ backgroundImage: "url(/hero-rays.png)" }}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(180deg,_rgba(0,0,0,1)_0%,_rgba(56,56,249,1)_100%)] -z-20" />
      <div className="container">
        <div className="flex flex-col justify-center items-center gap-2 max-w-165.25 mx-auto">
          <Pill className="text-white">Contact us</Pill>
          <p className="text-white text-body text-center">
            Marketing does not get better by waiting. If you are ready to
            challenge what is not working and want an honest conversation about
            growth, you are in the right place.
          </p>
          <h2 className="text-white text-5xl">Let’s talk</h2>
          <p className="text-white text-body text-center py-7.5">
            New business or a concrete question?
          </p>
        </div>
      </div>
    </section>
  );
};

export default page;
