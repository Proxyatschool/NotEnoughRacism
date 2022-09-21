import {
    mc,
    PREFIX,
    MISC_PREFIX,
    CHAT_PREFIX,
    GUI_PREFIX,
    ITEM_PREFIX,
    ADVANCE_PREFIX,
    BP,
    C08PacketPlayerBlockPlacement,
    C09PacketHeldItemChange,
    C0APacketAnimation,
    playerESP,
    DiscordRPC,
    DiscordRichPresence,
    DiscordEventHandlers,
    ghostBlockExclude,
    blockCoords,
    SPOTIFY_PREFIX,
} from "./utils/Constants";

let inHowl = false;
let inSpidersDen = false;
let inEnd = false;
let inCrypt = false;
let inGunpowderMines = false;
let inIsland = false;
let inDungeon = false;
let inMist = false;
let inF7 = false;

import { RenderLib, config, macros, dungeons, esp, slayer, request } from "./index";
import { revealHiddenMobs } from "./features/misc/RevealHiddenMobs";
import { coordGhostBlocks } from "./features/ghostblocks/CoordinateGhostBlocks";
import { ghostBlocks } from "./features/ghostblocks/GhostBlocks";
import { stonkGhostBlockPlayerInteract, stonkGhostBlocksTick } from "./features/ghostblocks/StonkGhostBlocks";
import { boneMacros } from "./features/macros/BoneMacro";
import { dungeonSellerGUI, dungeonSellerTick } from "./features/guimacros/DungeonSeller";
import { potionSeller } from "./features/guimacros/PotionSeller";
import { inCombatWardrobeGUI, InCombatWardrobeTick } from "./features/guimacros/InCombatWardrobe";
import { inCombatTradeGUI, inCombatTradeTick } from "./features/guimacros/InCombatTrade";
import { autoCombine } from "./features/guimacros/AutoCombine";
import { autoMort } from "./features/guimacros/AutoMort";
import { autoSalvage } from "./features/guimacros/AutoSalvage";
import { ClickMacro } from "./utils/ClickMacro";
import { termSwapper } from "./features/macros/TermSwap";
import { endStoneSwordtoKatana } from "./features/macros/EndstoneSwordKatanaMacro";
import { rogueSwordMacro } from "./features/macros/RogueSwordMacro";
import { autoWardrobeGUI, autoWardrobeTick } from "./features/guimacros/WardrobeSwap";
import { enderChestGUI, enderChestTick } from "./features/guimacros/EnderChest";
import { autoStorageGUI, autoStorageTick, openStorageGUI, openStorageTick } from "./features/guimacros/Storage";
import { autoSimonSays, clickSimonSays } from "./features/macros/AutoSimonSays";
import { blockGS, blockGyro, blockSbMenu } from "./features/misc/BlockClicks";
import { grindGhosts } from "./features/macros/SoulWhipSwap";
import { LegitRod } from "./features/macros/legitrod";
import { PacketRod } from "./features/macros/packetrod";
import { leftClickSoulWhip } from "./features/macros/LeftClickWhip";
import { aotsClicked, aotsSwap } from "./features/macros/AxeSwap";
import { autoRogueSword } from "./features/macros/AutoRogueSword";
import { termAC } from "./features/macros/TerminatorAutoClicker";
import { playerGhostArm } from "./features/misc/PlayerGhostArm";
import { zombieGhostArm } from "./features/misc/SummonsGhostArm";
import { witherCloakGhostArm } from "./features/misc/CreeperGhostArm";
import { drawBoxOnEntity, getEntities } from "./features/esp/ESP";
import { sercretAura } from "./features/macros/SecretAura";
// import { rpc } from "./features/misc/RichPresence";
// import SpotifyController from "./utils/SpotifyController";
import { s1LeapGUI, s1LeapTick } from "./features/guimacros/S1Leap";
import { buggedChunkLeapGUI, buggedChunkLeapTick } from "./features/guimacros/BuggedChunkLeap";
import { autoSpirit } from "./features/guimacros/AutoSpirit";
import { doubleSwapClick, doublwSwapStep } from "./features/macros/DoubleSwap";
import { tripleSwapClick, tripleSwapStep } from "./features/macros/TripleSwap";
import { isMouseOver, spotifyGuiScroll, spotifyRenderOverlay } from "./utils/spotifyGui";
import { inBoss } from "./utils/IslandUtils";
import { getCorrectLivid } from "./features/misc/LividGhostArm";
import { rpc } from "../build/features/misc/RichPresence";

const ghostBlockBind = new KeyBind("Ghost Blocks", Keyboard.KEY_NONE, ADVANCE_PREFIX);
const tradeMacro = new KeyBind("Trade Menu", Keyboard.KEY_NONE, CHAT_PREFIX);
const wardrobeMacro = new KeyBind("Wardrobe Macro", Keyboard.KEY_NONE, CHAT_PREFIX);
const sellPots = new KeyBind("Sell Speed 6 Pots", Keyboard.KEY_NONE, GUI_PREFIX);
const sellDungeonBS = new KeyBind("Sell Dungeons Garbage", Keyboard.KEY_NONE, GUI_PREFIX);
const storageSlot1 = new KeyBind("Storage Macro 1", Keyboard.KEY_NONE, GUI_PREFIX);
const storageSlot2 = new KeyBind("Storage Macro 2", Keyboard.KEY_NONE, GUI_PREFIX);
const storageSlot3 = new KeyBind("Storage Macro 3", Keyboard.KEY_NONE, GUI_PREFIX);
const storageSlot4 = new KeyBind("Storage Macro 4", Keyboard.KEY_NONE, GUI_PREFIX);
const storageMacro = new KeyBind("Storage Macro", Keyboard.KEY_NONE, CHAT_PREFIX);
const echestMacro = new KeyBind("Ender Chest Macro", Keyboard.KEY_NONE, GUI_PREFIX);
let firstSlot = new KeyBind("Wardrobe Slot 1", Keyboard.KEY_NONE, GUI_PREFIX);
let secondSlot = new KeyBind("Wardrobe Slot 2", Keyboard.KEY_NONE, GUI_PREFIX);
let thirdSlot = new KeyBind("Wardrobe Slot 3", Keyboard.KEY_NONE, GUI_PREFIX);
let fourthSlot = new KeyBind("Wardrobe Slot 4", Keyboard.KEY_NONE, GUI_PREFIX);
let fifthSlot = new KeyBind("Wardrobe Slot 5", Keyboard.KEY_NONE, GUI_PREFIX);
let sixthSlot = new KeyBind("Wardrobe Slot 6", Keyboard.KEY_NONE, GUI_PREFIX);
let seventhSlot = new KeyBind("Wardrobe Slot 7", Keyboard.KEY_NONE, GUI_PREFIX);
let eighthSlot = new KeyBind("Wardrobe Slot 8", Keyboard.KEY_NONE, GUI_PREFIX);
let ninethSlot = new KeyBind("Wardrobe Slot 9", Keyboard.KEY_NONE, GUI_PREFIX);

const boneMacro = new KeyBind("Bonemerang Macro", Keyboard.KEY_NONE, ADVANCE_PREFIX);
const termToggle = new KeyBind("Terminator Swap", Keyboard.KEY_NONE, ADVANCE_PREFIX);
const useEndStone = new KeyBind("Use End Stone Sword and Katana", Keyboard.KEY_NONE, ITEM_PREFIX);
const RogueMacro = new KeyBind("Rogue Sword Macro", Keyboard.KEY_NONE, ITEM_PREFIX);
const soulWhipSwap = new KeyBind("Soul Whip Swap (Toggle)", Keyboard.KEY_NONE, ADVANCE_PREFIX);
const leftClickWhip = new KeyBind("Left Click Soulwhip", Keyboard.KEY_NONE, ADVANCE_PREFIX);
const useAxe = new KeyBind("Axe Swap", Keyboard.KEY_NONE, ADVANCE_PREFIX);
const autoRogue = new KeyBind("Auto Rogue Sword", Keyboard.KEY_NONE, ADVANCE_PREFIX);
const autoClicker = new KeyBind("Terminator AC", Keyboard.KEY_NONE, ADVANCE_PREFIX);
const secretauraSwitchSettingsKeybind = new KeyBind("Secret Aura", Keyboard.KEY_NONE, ADVANCE_PREFIX);
const doubleSwap = new KeyBind("Double Swap Macro", Keyboard.KEY_NONE, ADVANCE_PREFIX);
const tripleSwap = new KeyBind("Triple Swap Macro", Keyboard.KEY_NONE, ADVANCE_PREFIX);

// const spotifyNext = new KeyBind("Next Song", Keyboard.KEY_NONE, SPOTIFY_PREFIX)
// const spotifyPrev = new KeyBind("Previous Song", Keyboard.KEY_NONE, SPOTIFY_PREFIX)

let termSwap = false;
let isGrindingGhosts = false;
let lcWhipToggle = false;
let axeSwap = false;
let autoSpeed = false;
let toggled = false;
let doubleSwapToggle = false;
let tripleSwapToggle = false;

new ClickMacro(
    "packet",
    "right",
    new KeyBind("Teleport Macro", Keyboard.KEY_NONE, ITEM_PREFIX),
    25,
    "isKeyDown",
    "Aspect of the End",
    "Aspect of the Void"
);
new ClickMacro(
    "packet",
    "right",
    new KeyBind("Use Wither Cloak", Keyboard.KEY_NONE, ITEM_PREFIX),
    25,
    "isPressed",
    "Wither Cloak Sword"
);
new ClickMacro(
    "packet",
    "right",
    new KeyBind("Use Ice Spray", Keyboard.KEY_NONE, ITEM_PREFIX),
    25,
    "isPressed",
    "Ice Spray Wand"
);
new ClickMacro(
    "packet",
    "right",
    new KeyBind("Use Wither Sword", Keyboard.KEY_NONE, ITEM_PREFIX),
    25,
    "isPressed",
    "Hyperion",
    "Valkyrie",
    "Scylla",
    "Astraea"
);
new ClickMacro(
    "packet",
    "right",
    new KeyBind("Use Fishing Rod", Keyboard.KEY_NONE, ITEM_PREFIX),
    25,
    "isPressed",
    "rod of the sea",
    "auger rod"
);
new ClickMacro(
    "packet",
    "right",
    new KeyBind("Use Juju shortbow", Keyboard.KEY_NONE, ITEM_PREFIX),
    25,
    "isPressed",
    "juju shortbow"
);
new ClickMacro(
    "packet",
    "right",
    new KeyBind(fuck you", Keyboard.KEY_NONE, ITEM_PREFIX),
    25,
    "isPressed",
    "aspect of the jerry"
);

register("chat", function (event) {
    let unformattedMessage = ChatLib.getChatMessage(event);
    let msgString = unformattedMessage.toString();
    if (msgString.startsWith("§cAutodie §eequipped your §7[Lvl " + macros.level + "] §6Ocelot§e!")) {
        if (macros.moduleMode == 0) {
            LegitRod();
        } else if (macros.moduleMode == 1) {
            PacketRod();
        }
    }
});

register("tick", ticks => {
    if (dungeons.autoS1Leap) {
        s1LeapTick();
    }
    if (dungeons.buggedChunkLeap) {
        buggedChunkLeapTick();
    }
    if (macros.autoCombine) {
        autoCombine();
    }
    if (macros.autoMort) {
        autoMort(ticks);
    }
    if (macros.autoSalvage) {
        autoSalvage();
    }
    // if (spotifyNext.isPressed()) {
    //     SpotifyController.skipToNext()
    // }
    // if (spotifyPrev.isPressed()) {
    //     SpotifyController.skipToPrevious()
    // }
    if (useEndStone.isPressed()) {
        endStoneSwordtoKatana();
    }
    if (RogueMacro.isPressed()) {
        rogueSwordMacro();
    }
    if (tradeMacro.isPressed()) {
        inCombatTradeTick();
    }
    if (wardrobeMacro.isPressed()) {
        InCombatWardrobeTick();
    }
    if (sellPots.isPressed()) {
        potionSeller();
    }
    if (sellDungeonBS.isPressed()) {
        dungeonSellerTick();
    }
    if (boneMacro.isKeyDown()) {
        boneMacros();
    }
    if (echestMacro.isPressed()) {
        enderChestTick();
    }
    if (storageMacro.isPressed()) {
        openStorageTick();
    }
    if (secretauraSwitchSettingsKeybind.isPressed()) {
        if (dungeons.secretAuraToggle) {
            ChatLib.chat(PREFIX + "&rSecret Aura &cDisabled");
            dungeons.secretAuraToggle = false;
        } else if (!dungeons.secretAuraToggle) {
            ChatLib.chat(PREFIX + "&rSecret Aura &aEnabled");
            dungeons.secretAuraToggle = true;
        }
    }
    if (macros.termSwap === 0) {
        if (termToggle.isPressed()) {
            ChatLib.chat(
                `${
                    (termSwap = !termSwap)
                        ? PREFIX + "&rTerminator Swap &aEnabled"
                        : PREFIX + "&rTerminator Swap &cDisabled"
                }`
            );
        }
    }
    if (soulWhipSwap.isPressed()) {
        ChatLib.chat(
            `${
                (isGrindingGhosts = !isGrindingGhosts)
                    ? PREFIX + "&rGhost SwordSwap &aEnabled"
                    : PREFIX + "&rGhost SwordSwap &cDisabled"
            }`
        );
    }
    if (leftClickWhip.isPressed()) {
        ChatLib.chat(
            `${
                (lcWhipToggle = !lcWhipToggle)
                    ? PREFIX + "&rSoul Whip Swap &aEnabled"
                    : PREFIX + "&rSoul Whip Swap &cDisabled"
            }`
        );
    }
    if (dungeons.autoSS && dungeons.autoSSType === 0) {
        autoSimonSays();
    }
    if (macros.axeSwap === 0 || macros.axeSwap === 2) {
        if (useAxe.isPressed()) {
            lastSwap = new Date().getTime();
            ChatLib.chat(
                `${(axeSwap = !axeSwap) ? PREFIX + "&rAxe Swap &aEnabled" : PREFIX + "&rAxe Swap &cDisabled"}`
            );
        }
    }
    if (autoRogue.isPressed()) {
        ChatLib.chat(
            `${(autoSpeed = !autoSpeed) ? PREFIX + "&rAuto Rogue &aEnabled" : PREFIX + "&rAuto Rogue &cDisabled"}`
        );

        // To Trigger when Clicked instead of 30s After
        if (autoSpeed) {
            if (!inDungeon) return;
            for (let i = 0; i < 9; i++) {
                if (
                    Player.getInventory().getStackInSlot(i).getName().removeFormatting().toLowerCase().includes("rogue")
                ) {
                    Client.sendPacket(new C09PacketHeldItemChange(i));
                    for (let j = 0; j < dungeons.autoRogueClicks; j++) {
                        Client.sendPacket(
                            new C08PacketPlayerBlockPlacement(
                                new BlockPos(-1, -1, -1),
                                255,
                                Player.getInventory().getStackInSlot(i).getItemStack(),
                                0,
                                0,
                                0
                            )
                        );
                        // ChatLib.chat("Clicked Rogue Sword");
                    }
                    Client.sendPacket(new C09PacketHeldItemChange(Player.getInventory().getInventory().field_70461_c));
                    break;
                }
            }
        }
    }
    if (doubleSwap.isPressed()) {
        ChatLib.chat(
            `${
                (doubleSwapToggle = !doubleSwapToggle)
                    ? PREFIX + "&rDouble Swap &aEnabled"
                    : PREFIX + "&rDouble Swap &cDisabled"
            }`
        );
    }
    if (tripleSwap.isPressed()) {
        ChatLib.chat(
            `${
                (tripleSwapToggle = !tripleSwapToggle)
                    ? PREFIX + "&rTriple Swap &aEnabled"
                    : PREFIX + "&rTriple Swap &cDisabled"
            }`
        );
    }
    if (autoClicker.isPressed()) {
        ChatLib.chat(
            `${(toggled = !toggled) ? PREFIX + "&rTerminator AC &aEnabled" : PREFIX + "&rTerminator AC &cDisabled"}`
        );
    }
    autoRogueSword(autoSpeed);
    termSwapper(termSwap);
    autoWardrobeTick(
        firstSlot,
        secondSlot,
        thirdSlot,
        fourthSlot,
        fifthSlot,
        sixthSlot,
        seventhSlot,
        eighthSlot,
        ninethSlot
    );
    autoStorageTick(storageSlot1, storageSlot2, storageSlot3, storageSlot4);
    aotsSwap(useAxe, axeSwap);
    if (config.ghostArm && config.ghostArmToggle) {
        zombieGhostArm();
    }
});

register("postGuiRender", () => {
    inCombatTradeGUI();
    inCombatWardrobeGUI();
    dungeonSellerGUI();
    autoWardrobeGUI();
    enderChestGUI();
    openStorageGUI();
    autoStorageGUI();
    if (dungeons.s1Leap) {
        s1LeapGUI();
    }
    if (dungeons.buggedChunkLeap) {
        buggedChunkLeapGUI();
    }
    if (dungeons.autospiritToggle) {
        autoSpirit();
    }
});
register("playerInteract", (action, pos, event) => {
    if (dungeons.stonkGB) {
        stonkGhostBlockPlayerInteract(action, pos, event);
    }
    if (config.blockClicks) {
        if (config.gsBlock) {
            blockGS(action, event);
        }
        if (config.gyroBlock) {
            blockGyro(action, event);
        }
        if (config.blockSBMenu) {
            blockSbMenu(action, event);
        }
    }
});

register("step", () => {
    if (ghostBlockBind.isKeyDown()) {
        ghostBlocks();
    }
    if (dungeons.stonkGB) {
        stonkGhostBlocksTick();
    }
    if (dungeons.coordGB) {
        coordGhostBlocks();
    }
    if (toggled) {
        termAC(toggled);
    }
}).setFps(40);

register("step", () => {
    grindGhosts(isGrindingGhosts);
    let scoreboardLines = Scoreboard.getLines().map(line => line.getName().removeFormatting().toLowerCase());
    scoreboardLines.forEach(line => {
        if (line.includes("howl") || line.includes("castle")) {
            inHowl = true;
        }
        if (line.includes("spider")) {
            inSpidersDen = true;
        }
        if (line.includes("coal") || line.includes("graveyard")) {
            inCrypt = true;
        }
        if (line.includes("end") || line.includes("drag") || line.includes("void")) {
            inEnd = true;
        }
        if (line.includes("gunpowder")) {
            inGunpowderMines = true;
        }
        if (line.includes("your")) {
            inIsland = true;
        }
        if (line.includes("cata")) {
            inDungeon = true;
        }
        if (line.includes("f7")) {
            inF7 = true;
        }
        if (line.includes("mist")) {
            inMist = true;
        }
    });
    if (dungeons.secretAuraToggle) {
        sercretAura();
    }
    if (doubleSwapToggle) {
        doublwSwapStep();
    }
    if (tripleSwapToggle) {
        tripleSwapStep();
    }
}).setFps(2);

register("step", () => {
    rpc();
}).setFps(1);

// register("worldLoad", () => {
//     if (SpotifyController.firstInitAttempt === false) {
//         SpotifyController.initialize();
//     }
// })

register("worldUnload", () => {
    rpc();
});

register("renderEntity", (entity, pos, pticks, event) => {
    revealHiddenMobs(entity);
    if (config.playerGhostArm && config.ghostArmToggle) {
        playerGhostArm(entity);
    }
    if (config.creeperGhostArm && config.ghostArmToggle) {
        witherCloakGhostArm(entity);
    }
    if (config.lividGhostArm && config.ghostArmToggle) {
        getCorrectLivid(entity);
    }
});

register("clicked", (x, y, button, state) => {
    if (dungeons.autoSS && dungeons.autoSSType === 1) {
        clickSimonSays(button);
    }
    leftClickSoulWhip(button, leftClickWhip);
    if (axeSwap && macros.axeSwap === 2) {
        aotsClicked(axeSwap, button);
    }
    if (doubleSwapToggle) {
        //   ChatLib.chat("test")
        doubleSwapClick(button);
    }
    if (tripleSwapToggle) {
        tripleSwapClick(button);
    }
});

register("step", () => {
    if (esp.enabled) {
        getEntities();
    }
}).setFps(esp.espRefreshRate);

register("renderWorld", () => {
    if (esp.enabled) {
        drawBoxOnEntity();
    }
});

register("scrolled", (x, y, direction) => {
    spotifyGuiScroll(direction);
});

let zzz = false;

register("guiMouseClick", (x, y, button, gui, event) => {
    //  ChatLib.chat("clicked")
    if (isMouseOver(config.spotifyX, config.spotifyY, config.spotifyWidth, config.spotifyHeight)) {
        zzz = true;
        //  ChatLib.chat("true");
    } else {
        zzz = false;
    }
    //  ChatLib.chat(gui);
});
register("dragged", (dX, dY, x, y) => {
    if (zzz) {
        if (config.moveSongGui.isOpen()) {
            config.spotifyX = x;
            config.spotifyY = y;
        }
    }
});

register("renderOverlay", () => {
    spotifyRenderOverlay(config.moveSongGui.isOpen());
});

register("guiClosed", gui => {
    if (config.moveSongGui.isOpen()) {
        ChatLib.command("nergeneral", true);
    }
    // ChatLib.chat(gui);
    // if (gui === "gg.essential.vigilance.gui.SettingsGui@50c776dc") { // gg.essential.vigilance.gui.SettingsGui@577cd5d
    //     ChatLib.command("ner");
    // }
});

let calcMsg = new Message(new TextComponent("&r                     &r&fSecrets Found: &r&bCalculating..&r"));
let lastExtraStatsClick = [false, 0];
register("chat", event => {
    let reallyPureMsg = ChatLib.getChatMessage(event, true);
    let pureMsg = ChatLib.getChatMessage(event, true).replace(/ /gi, "");
    // console.log(reallyPureMsg.length + ": " + reallyPureMsg)
    if (pureMsg.startsWith("&r&r&6>&e&lEXTRASTATS&6<")) {
        lastExtraStatsClick = [true, new Date().getTime()];
        ChatLib.say("/showextrastats");
        calcMsg.chat();
        // console.log(1)
    }
    if (new Date().getTime() - lastExtraStatsClick[1] > 2000) {
        return;
    }
    if (pureMsg === "&r&a&l▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬&r") {
        if (lastExtraStatsClick[0]) {
            lastExtraStatsClick[0] = false;
        } else {
            cancel(event);
        }
    }
    if (pureMsg.startsWith("&r&r&cTheCatacombs&r&8-")) {
        cancel(event);
    } else if (pureMsg.startsWith("&r&r&fTotalDamageas")) {
        cancel(event);
    } else if (pureMsg.startsWith("&r&r&fTeamScore:")) {
        cancel(event);
    } else if (pureMsg.startsWith("&r&r&fEnemiesKilled:")) {
        cancel(event);
    } else if (pureMsg.startsWith("&r&r&fDeaths:&r&c")) {
        cancel(event);
    } else if (pureMsg.startsWith("&r&r&c☠&r&eDefeated&r&c")) {
        cancel(event);
    } else if (pureMsg.startsWith("&r&r&fAllyHealing:&r&a")) {
        cancel(event);
    } else if (pureMsg.startsWith("&r&r&fSecretsFound:")) {
        cancel(event);
        ChatLib.editChat(calcMsg, new Message(new TextComponent(reallyPureMsg)));
    }
}).setChatCriteria("${*}");
