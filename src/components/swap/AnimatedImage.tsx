

const AnimatedImage = ({ variant = "bounce", imageComponent: ImageComponent }: {
    variant: "bounce" | "pulse",
    imageComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}
) => {
    const animations = {
        bounce: "animate-bounce",
        pulse: "animate-pulse",
    };

    const selectedAnimation = animations[variant] || animations.bounce;

    return (
        <div className="flex justify-center items-center p-4">
            <div className={`${selectedAnimation}`}>
                <ImageComponent
                    className="
                    dark:stroke-white stroke-special-black
                    cursor-pointer transition-transform duration-300 hover:scale-110"
                />
            </div>
        </div>
    );
};

export default AnimatedImage
