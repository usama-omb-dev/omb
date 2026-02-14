import Image from "next/image";
import { ContactForm } from "../Form";
import TextReveal from "@/components/ui/TextReveal";

const Contact = () => {
  const brandingList = [
    "The guts to take a stand",
    "Ready to say goodbye to mediocrity",
    "Understand that doing what everyone else does won’t work",
    "Want a recipe that works, not just sounds good",
  ];
  return (
    <section className="lg:py-37.5 py-10">
      <div className="container">
        <div className="rounded-4xl bg-linear-to-t from-[#212193] to-[#3838F9] xl:p-14.75 lg:p-10 p-6 grid lg:grid-cols-2 gap-6 lg:gap-0 relative isolate overflow-hidden">
          <Image
            src={"/glitchy-overlay.png"}
            alt="Overlay"
            width={1306}
            height={822}
            className="absolute -z-20 top-0 left-0 w-full h-full opacity-80"
          />
          <div className="flex flex-col lg:gap-7.5 gap-4">
            <Image src={"/omb-logo.png"} alt="Logo" width={65} height={92} />
            <div>
              <h5 className="text-white text-md font-medium">
                <TextReveal>Elevate your brand</TextReveal>
              </h5>
              <h2 className="text-white xl:text-3xl text-2xl leading-none xl:pr-24 pr-10">
                <TextReveal>We deliver the results you want.</TextReveal>
              </h2>
            </div>
            <div className="xl:pt-7.5 xl:pr-0 pr-5 flex flex-col lg:gap-7.5 gap-4">
              <p className="xl:text-body text-sm font-medium text-white">
                Not everyone is ready for our approach. We don't just bake
                dozens of products.
              </p>
              <p className="xl:text-body text-sm font-medium text-white">
                {`– we create marketing with character for brands that dare.`}
              </p>
              <ul className="flex flex-col gap-2.5">
                {brandingList.map((item, index) => (
                  <li
                    key={index + 1}
                    className="text-white xl:text-body text-sm font-medium flex items-center gap-3.75"
                  >
                    <Image src={"/gr-tick.png"} alt="" width={27} height={27} />{" "}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-white/4 backdrop-blur-3xl border border-white/26 rounded-[0.625rem] xl:p-11.5 p-6 xl:pr-6.5">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
