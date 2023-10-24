"use client"

import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import PricingComponent from "@/components/shared/Pricing";



const DialogNextUI = ({ isOpen, onOpenChange }: any) => {
    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
                <ModalContent>
                    <>
                        <ModalBody>
                            <PricingComponent />
                        </ModalBody>
                    </>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DialogNextUI