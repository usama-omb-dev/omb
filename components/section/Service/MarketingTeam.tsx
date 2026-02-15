import AnimatedArrowIcon from "@/components/ui/button/AnimatedArrowIcon";
import AnimatedButton from "@/components/ui/button/AnimatedButton";
import Pill from "@/components/ui/pill";
import Image from "next/image";

const MarketingTeam = () => {
  const marketingTeam = [
    {
      title: "Rubin Koot",
      profileImage: "/rubin-koot.png",
      designation: "Owner",
    },
    {
      title: "John Smith",
      profileImage: "/john-smith.png",
      designation: "Digital Marketer",
    },
    {
      title: "Jasmin Hachmane",
      profileImage: "/jasmin-hachmane.png",
      designation: "Ui/UX Designer",
    },
    {
      title: "Julia Roth",
      profileImage: "/julia-roth.png",
      designation: "Copywriter",
    },
    {
      title: "John Smith",
      profileImage: "/john-smith.png",
      designation: "Digital Marketer",
    },
    {
      title: "Rubin Koot",
      profileImage: "/rubin-koot.png",
      designation: "Owner",
    },
    {
      title: "John Smith",
      profileImage: "/john-smith.png",
      designation: "Digital Marketer",
    },
    {
      title: "Jasmin Hachmane",
      profileImage: "/jasmin-hachmane.png",
      designation: "Ui/UX Designer",
    },
    {
      title: "Micky Meowsers",
      profileImage: "/micky-meowsers.png",
      designation: "Purrtner",
    },
  ];

  return (
    <section>
      <div className="container">
        <div className="bg-white xl:py-20 xl:px-27.5 lg:py-16 sm:py-8 lg:px-16 sm:px-8 p-4 rounded-4xl flex flex-col lg:gap-20 gap-10">
          <div className="flex flex-col items-center justify-center self-center lg:gap-7.5 gap-5 max-w-118.5">
            <Pill iconColor="#3838F9">The OMB Team</Pill>
            <h3 className="text-center font-medium sm:text-2xl text-lg leading-none">
              Our global <span className="italic">A-team</span> of B2B Marketing{" "}
              <span className="text-primary">Experts</span>
            </h3>
          </div>
          <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm:gap-x-3.5 sm:gap-y-10 gap-4">
            {marketingTeam.map((item, index) => (
              <div key={index + 1} className="flex flex-col gap-5 ">
                <Image
                  src={item.profileImage}
                  alt={item.title}
                  width={206}
                  height={265}
                  className="rounded-[0.625rem] w-full"
                  unoptimized
                />
                <div className="flex flex-col gap-2.5">
                  <h6 className="font-medium text-md leading-none">
                    {item.title.split(" ").map((titleName, index) => (
                      <span key={`${titleName}-${index}`} className="block">
                        {titleName}
                      </span>
                    ))}
                  </h6>

                  <span className="text-black/40 sm:text-body text-sm leading-none">
                    Owner
                  </span>
                </div>
              </div>
            ))}
            <div className="bg-primary p-5 rounded-[0.625rem] flex flex-col gap-6 h-fit">
              <h6 className="text-white font-medium text-md 2xl:pr-20 pr-10 leading-none">
                You think you <span className="italic">fit</span> in?
              </h6>
              <p className="text-white">
                Check our recent openings, and fill our application to be a part
                of this awesome team!
              </p>
              <AnimatedButton
                size={"icon"}
                className=""
                trailingContent={<AnimatedArrowIcon />}
              >
                Careers
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingTeam;
