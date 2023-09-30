'use client';

import { FC, useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';

interface UploadButtonProps {}

const UploadButton: FC<UploadButtonProps> = ({}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(v) => {
                if (!v) {
                    setIsOpen(v);
                }
            }}
        >
            <DialogTrigger onClick={() => setIsOpen(true)} asChild>
                <Button>Upload PDF</Button>
            </DialogTrigger>
            <DialogContent>example content</DialogContent>
        </Dialog>
    );
};

export default UploadButton;
