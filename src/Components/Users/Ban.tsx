import { Dialog, DialogBody, Typography, Button } from "@material-tailwind/react"; import { Icon } from "@iconify/react";

//Interface
interface Props {
    open: boolean;
    onClose: () => void;
    onConfirm: (id: string) => void;
    fetching: boolean;
    id: string;
}

const Ban = ({ open, onClose, onConfirm, fetching, id }: Props) => {
    return (
        <Dialog
            open={open}
            handler={onClose}
            animate={{
                mount: { y: 0 },
                unmount: { y: -15 },
            }}
            size="xs"
        >
            <DialogBody className="text-black text-center py-8">
                <Icon className="text-7xl inline text-red-600" icon="simple-line-icons:ban" />
                <Typography variant="h5" className="mt-2 mb-2 text-red-600">Ban User?</Typography>
                <Typography variant="paragraph" className="font-medium opacity-70">This action can&apos;t be undone!</Typography>
                <div className="mt-6 flex gap-5 justify-center">
                    <Button color="green" className="h-[36px] w-[90px] flex items-center justify-center focus:ring-0" variant="outlined" onClick={onClose}><span>Cancel</span></Button>
                    <Button color="green" className="bg-main h-[36px] w-[90px] flex justify-center items-center" onClick={() => onConfirm(id)} disabled={fetching}>
                        {fetching ? (
                            <div>
                                <div className="w-4 h-4 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                            </div>
                        ) : (
                            <span>Ban</span>
                        )}
                    </Button>
                </div>
            </DialogBody>
        </Dialog>
    );
};

export default Ban;