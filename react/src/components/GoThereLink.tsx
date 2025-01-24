
type LinkProps = {
    link: string
    linkText?: string
};

const GoThereLink = ({ link, linkText }: LinkProps) => {

    const handleOnLink = () => {
        const formattedLink = link.startsWith('http://') || link.startsWith('https://')
            ? link
            : `https://${link}`;

        window.open(formattedLink, '_blank', 'noopener,noreferrer');
    }

    return (
        <span
            onClick={handleOnLink}
            className="inline-flex font-medium items-center text-blue-600 underline"
        >
            {linkText}
            <svg
                className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
            >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                />
            </svg>
        </span>
  
    );
  };

export default GoThereLink;
