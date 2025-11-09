interface LogoProps {
    containerClassName?: string
    wrapperClassName?: string
    className?: string
}

const Logo = ({ containerClassName = '', wrapperClassName = '', className = '' }: LogoProps) => {
    return (
        <div className={`${containerClassName ? containerClassName : 'logo-container'}`}>
            <div className={`${wrapperClassName ? wrapperClassName : 'logo-container-wrapper'}`}>
                <img
                    src="/assets/humanistics_logo_transparent.webp"
                    alt="Humanistics AI"
                    className={`${className ? className : 'logo-container-wrapper-image'}`}
                />
            </div>
        </div>
    )
}

export default Logo