import { profiler, view, macro, screen, director } from "cc";
import { Layout_UI_HUD } from "./Layout_HUD";
import { UIMgr } from "../../../KFramework/kylins_ui_framework/UIMgr";
import { GameUILayer } from "../../../scripts/GameUILayer";
import { UI_HUD, UI_AboutMe, SubModule, UI_DemoList } from "../../../scripts/UIDef";
export class UI_HUD_Impl extends UI_HUD {
    constructor() {
        super('HUD/UI_HUD', GameUILayer.HUD, Layout_UI_HUD);
    }

    public getRes(): [] {
        return [];
    }

    //子类的所有操作，需要在这个函数之后。
    protected onCreated() {
        let layout = this.layout as Layout_UI_HUD;

        this.onButtonEvent(layout.btnScenes, this.onSceneChange, this);

        this.onButtonEvent(layout.btnToggleStats, this.onToggleStats, this);

        this.onButtonEvent(layout.btnAbout, () => {
            UIMgr.inst.showUI(UI_AboutMe);
        });
    }

    onToggleStats() {
        if (profiler.isShowingStats()) {
            profiler.hideStats();
        }
        else {
            profiler.showStats();
        }
    }

    onSceneChange() {
        UIMgr.inst.showUI(UI_DemoList,(ui:UI_DemoList)=>{
            ui.showCloseBtn();
        });
    }

    //销毁
    protected onDispose() {

    }
    //
    protected onUpdate() {

    }
}

SubModule.attachImplClass(UI_HUD, UI_HUD_Impl);