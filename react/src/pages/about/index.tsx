import CollapseContainer from "../../components/Accordion"
import { LANG } from "../../utils/constants"

const About = () => {
    return (
        <div className="mt-6 px-4 sm:px-8 md:px-16 lg:px-32">
            <div className="flex flex-col items-center justify-center w-full mb-8 gap-4 text-center">
                <h1 className="text-3xl font-bold text-gray-200">{LANG.EN.ABOUT}</h1>
                <p className="text-gray-400 max-w-2xl leading-relaxed tracking-wide">{LANG.EN.INTRO}</p>
            </div>

            <CollapseContainer text={LANG.EN.HOW_IT_WORKS_TITLE}>
                <div className="mt-2 tracking-wide">
                    {LANG.EN.HOW_IT_WORKS.map((text, index) => (
                        <p key={index} className="mb-4 text-gray-400">{text}</p>
                    ))}
                </div>
            </CollapseContainer>

            <CollapseContainer text={LANG.EN.FEATURES_TITLE}>
                <div className="mt-2 tracking-wide">
                    <ul className="list-disc list-inside text-gray-400">
                        {LANG.EN.FEATURES.map((feature, index) => (
                            <li key={index} className="mb-2">{feature}</li>
                        ))}
                    </ul>
                </div>
            </CollapseContainer>

            <CollapseContainer text={LANG.EN.PURPOSE_TITLE} subText={LANG.EN.DISCLAIMERS}>
                <div className="mt-2 text-gray-400 tracking-wide">
                    {LANG.EN.PURPOSE.map((text, index) => (
                        <p key={index} className="mb-4">{text}</p>
                    ))}
                </div>
            </CollapseContainer>

            <CollapseContainer text={LANG.EN.ABOUT_ME_TITLE} subText={LANG.EN.FUNNY_NOTE}>
                <div className="mt-2 text-gray-400 tracking-wide">
                    <p>{LANG.EN.ABOUT_ME.NAME}</p>
                    <p>{LANG.EN.EMAIL}: {LANG.EN.ABOUT_ME.EMAIL}</p>
                </div>
            </CollapseContainer>
        </div>
    );
};

export default About;