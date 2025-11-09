import React from 'react';
import '@styles/components/splash-screen.scss';

interface SplashScreenProps {
    /** Duration of splash screen in milliseconds. Default: 5000 (5 seconds) */
    duration?: number;
    /** Logo width in pixels or CSS units. Default: '180px' */
    logoWidth?: string;
    /** Logo height in pixels or CSS units. Default: 'auto' */
    logoHeight?: string;
    /** Pulsation speed in seconds. Default: 2 */
    pulseSpeed?: number;
    /** Custom class names */
    className?: string;
}

const SplashScreen: React.FC<SplashScreenProps> = ({
    duration = 5000,
    logoWidth = '180px',
    logoHeight = 'auto',
    pulseSpeed = 2,
    className,
}) => {
    return (
        <div className={`splash-screen ${className || ''}`}>
            <div
                className="splash-screen__logo-container"
                style={{
                    '--pulse-speed': `${pulseSpeed}s`,
                    '--logo-width': logoWidth,
                    '--logo-height': logoHeight,
                } as React.CSSProperties}
            >
                <img
                    src="/assets/humanistics_logo_transparent.webp"
                    alt="Humanistics Logo"
                    className="splash-screen__logo"
                />
            </div>
        </div>
    );
};

export default SplashScreen;