import { BP, C08PacketPlayerBlockPlacement, C09PacketHeldItemChange } from "../../utils/Constants";
import { macros } from "../../index";
let lastSwap = new Date().getTime();

const PacketRod = () => {
    new Thread(() => {
        if (macros.toggled == true) {
            if (macros.moduleMode == 1) {
                for (let i = 0; i < 9; i++) {
                    if (
                        Player.getInventory().getStackInSlot(i) !== null &&
                        Player.getInventory()
                            .getStackInSlot(i)
                            .getName()
                            .removeFormatting()
                            .toLowerCase()
                            .includes("rod")
                    ) {
                        if (new Date().getTime() - lastSwap > 500) {
                            let axe;
                            let rod;
                            Player.getOpenedInventory()
                                .getItems()
                                .slice(36, 45)
                                .forEach((item, index) => {
                                    if (
                                        item !== null &&
                                        (item.getName().includes("Treecap") || item.getName().includes("Axe"))
                                    ) {
                                        axe = index;
                                    }
                                    if (item !== null && item.getName().includes("Rod")) {
                                        rod = index;
                                    }
                                });
                            let min = macros.min;
                            let max = macros.max;
                            let random = Math.floor(Math.random() * (+max - +min)) + +min;
                            Thread.sleep(random);
                            Client.sendPacket(new C09PacketHeldItemChange(rod));
                            Client.sendPacket(
                                new C08PacketPlayerBlockPlacement(
                                    new BP(-1, -1, -1),
                                    255,
                                    Player.getHeldItem().getItemStack(),
                                    0,
                                    0,
                                    0
                                )
                            );
                            Client.sendPacket(
                                new C08PacketPlayerBlockPlacement(
                                    new BP(-1, -1, -1),
                                    255,
                                    Player.getHeldItem().getItemStack(),
                                    0,
                                    0,
                                    0
                                )
                            );
                            Client.sendPacket(new C09PacketHeldItemChange(axe));
                            break;
                        }
                    }
                }
            }
        }
    }).start();
};

export { PacketRod };
