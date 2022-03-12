import { macros } from "../../index";
import { RightClick } from "../../utils/Utils";
let lastSwap = new Date().getTime();

const LegitRod = () => {
    new Thread(()=>{
        if (macros.Toggled == true){
            if (macros.moduleMode == 0) {
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
                    let min=macros.min;
                    let max=macros.max;
                    let random = Math.floor(Math.random() * (+max - +min)) + +min;
                    Thread.sleep(random)
                    Player.setHeldItemIndex(Rod)
                    Thread.sleep(300)
                    RightClick.invoke(Client.getMinecraft())
                    Player.setHeldItemIndex(Axe)
                    break;
        }
    }
                    }
                }
                }
            }).start()
}




export { LegitRod }
