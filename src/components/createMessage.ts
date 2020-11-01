import Message from '@/components/Message.vue';
import { createApp } from 'vue';
export type MessageType = "success" | "error" | "default";

function createMessage (message: string, type: MessageType, timeout = 3000) {
    // 创建组件实例
    const messageInstance = createApp(Message, {
        message,
        type
    });
    const mountNode = document.createElement('div')// 创建节点
    document.body.appendChild(mountNode); // 将节点放到body中
    messageInstance.mount(mountNode); // 将组件挂载到指定节点
    setTimeout(() => {
        messageInstance.unmount(mountNode); // 将组件从指定节点卸载
        document.body.removeChild(mountNode); // 移除节点
    }, timeout)
}

export default createMessage;