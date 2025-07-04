import { THREE, BasePlugin } from "../basePlugin";
import eventBus from "../../eventBus/eventBus";
import * as TWEEN from "@tweenjs/tween.js";

export class RenderLoop extends BasePlugin {
    private clock: THREE.Clock;
    private taskList: (() => void)[] = [];
    private animationID: number;

    constructor(meta: any) {
        super(meta);
        this.taskList = [];
        this.clock = new THREE.Clock();
        this.animationID = 0;
    }

    initialize() {
        const render = () => {
            eventBus.emit("update"); // 触发更新事件
            TWEEN.update(); // tween动画更新
            this.animationID = requestAnimationFrame(render); // 需要持续循环
        };
        this.animationID = requestAnimationFrame(render);
    }

    addTask(callback: () => void) {
        this.taskList.push(callback);
    }

    removeTask(callback: () => void) {
        this.taskList = this.taskList.filter(task => task !== callback);
    }

    pause() {
        cancelAnimationFrame(this.animationID);
        this.taskList = [];
    }

    // 后续扩展 按需渲染
}
