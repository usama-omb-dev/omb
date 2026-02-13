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
    <section className="py-37.5">
      <div className="container">
        <div className="rounded-4xl bg-linear-to-t from-[#212193] to-[#3838F9] p-14.75 grid grid-cols-2 relative isolate overflow-hidden">
          <Image
            src={"/glitchy-overlay.png"}
            alt="Overlay"
            width={1306}
            height={822}
            className="absolute -z-20 top-0 left-0 w-full h-full opacity-80"
          />
          <div className="flex flex-col gap-7.5">
            <Image src={"/omb-logo.png"} alt="Logo" width={65} height={92} />
            <div>
              <h5 className="text-white text-md font-medium">
                <TextReveal>Elevate your brand</TextReveal>
              </h5>
              <h2 className="text-white text-3xl leading-none pr-24">
                <TextReveal>We deliver the results you want.</TextReveal>
              </h2>
            </div>
            <div className="pt-7.5 flex flex-col gap-7.5">
              <p className="text-body font-medium text-white">
                Not everyone is ready for our approach. We don't just bake
                dozens of products.
              </p>
              <p className="text-body font-medium text-white">
                {`– we create marketing with character for brands that dare.`}
              </p>
              <ul className="flex flex-col gap-2.5">
                {brandingList.map((item, index) => (
                  <li
                    key={index + 1}
                    className="text-white text-body font-medium flex items-center gap-3.75"
                  >
                    <Image src={"/gr-tick.png"} alt="" width={27} height={27} />{" "}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-white/4 backdrop-blur-3xl border border-white/26 rounded-[0.625rem] p-11.5 pr-6.5">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
