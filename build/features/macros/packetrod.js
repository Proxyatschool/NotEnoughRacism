import { BP, C08PacketPlayerBlockPlacement, C09PacketHeldItemChange } from "../../utils/Constants";
import { macros } from "../../index";
let lastSwap = new Date().getTime();

const PacketRod = () => {
    new Thread(()=>{
        if (macros.Toggled == true){
            if (macros.moduleMode == 1) {
            for (let i = 0; i < 9; i++) {
                if (Player.getInventory().getStackInSlot(i) !== null && Player.getInventory().getStackInSlot(i).getName().removeFormatting().toLowerCase().includes("rod")) {
                    if (new Date().getTime() - lastSwap > 500) {
                        let Axe;
                        let Rod;
                    Player.getOpenedInventory().getItems().slice(36, 45).forEach((item, index) => {
                        if (item !== null && (item.getName().includes("Treecap") || item.getName().includes("Axe"))) {
                            Axe = index;
                        }
                        if (item !== null && item.getName().includes("Rod")) {
                            Rod = index;
                        }
                    })
                    var min=macros.min;
                    var max=macros.max;
                    var random = Math.floor(Math.random() * (+max - +min)) + +min;
                    Thread.sleep(random)
                    Client.sendPacket(new C09PacketHeldItemChange(Rod));
                    Client.sendPacket(new C08PacketPlayerBlockPlacement(new BP(-1, -1, -1), 255, Player.getHeldItem().getItemStack(), 0, 0, 0)) 
                    Client.sendPacket(new C08PacketPlayerBlockPlacement(new BP(-1, -1, -1), 255, Player.getHeldItem().getItemStack(), 0, 0, 0)) 
                    Client.sendPacket(new C09PacketHeldItemChange(Axe));
                    break;
        }
    }
                    }
                }
                }
            }).start()
}




export { PacketRod }
