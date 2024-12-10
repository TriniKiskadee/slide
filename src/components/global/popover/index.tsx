import {Popover} from "@radix-ui/react-popover";
import {PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";

type PopOverProps = {
    children: React.ReactNode;
    className?: string;
    trigger?: JSX.Element;
};

const PopOver = ({trigger, children, className}: PopOverProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                {trigger}
            </PopoverTrigger>
            <PopoverContent
                className={cn(
                    'bg-[#1D1D1D] shadow-lg',
                    className
                )}
                align={'end'}
                side={'bottom'}
            >
                {children}
            </PopoverContent>
        </Popover>
    );
};
export default PopOver;
