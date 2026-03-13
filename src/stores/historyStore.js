// 历史记录数据持久化存储
import { defineStore } from 'pinia'
import {ref} from 'vue'

export const useHistoryStore = defineStore('history', {
    // 定义状态与行为
    state: ()=>{
        return {
            // 定义浏览历史记录列表的state
            historyList: ref([])
        }
    },
    actions: {
        // 添加历史记录
        // 定义添加历史记录的action
        addHistory(history){
            // 检查是否已存在相同的历史记录
            const index = this.historyList.findIndex(item => item.id == history.id && item.author == history.author)
            // 如果已存在相同记录，则先删除旧记录
            if(index !== -1){
                this.historyList.splice(index, 1)
            }
            // 确保列表不超过最大长度
            if(this.historyList.length >= 10){
                this.historyList.shift() // 删除最旧的记录
            }
            this.historyList.push(history)
        },
        // 删除所有历史记录
        deleteAllHistory(){
            this.historyList = []
        },
        // 删除单条历史记录
        deleteHistory(index){
            // 检查索引是否有效
            if(index < 0 || index >= this.historyList.length){
                console.error('无效的索引')
                return
            }
            this.historyList.splice(index, 1)
        }
    }
},{
    persist: true
})