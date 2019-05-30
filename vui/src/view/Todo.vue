<template>
  <div id="app">
      <div class="hTitle">Todo List</div>
      <el-input v-model="newTodoTitle"
                placeholder="添加 todo"
                :class='{empty: emptyChecked}'></el-input>
      <el-button @click="addTodo" style="margin-left: 10px" type="primary">ADD</el-button>
      <h3 v-if="emptyChecked" style="color: red">請输入内容!</h3>
    <!--todo list-->
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :md="20">
          <ul style="list-style: none">
          <li v-for='todo in filteredTodos' :key='todo.id' class="addList">
                <span :class="{completed: todo.completed}"
                         v-on:dblclick="editTodo(todo)" class="addListTitle">{{ todo.title }}</span>
            <div class="mainButton">
              <el-button v-if="!todo.completed"
                         v-on:click="markAsCompleted(todo)" type="success" icon="el-icon-check" circle></el-button>
              <el-button
                         v-on:click="markAsUncompleted(todo)" type="info" icon="el-icon-back" circle></el-button>
              <el-button v-if="todo.removed"
                         v-on:click="restoreTodo()">還原</el-button>
              <el-button v-else
                         v-on:click="removeTodo(todo)" type="danger" icon="el-icon-delete" circle></el-button>
              <el-input v-if="editedTodo!==null && editedTodo.id===todo.id"
                        value="編輯 todo..."
                        v-model="todo.title"
                        v-on:keyup.enter="editDone(todo)"
                        v-on:keyup.esc="cancelEdit(todo)"
                        v-focus="true"></el-input>
            </div>
            </li>
          </ul>
        </el-col>
      </el-row>

    <!-- end todo list -->
    <div>
      <span v-if="leftTodosCount" style="font-weight: bold;">剩於 {{leftTodosCount}} 項未完成 ---</span>
      <span v-else-if="completedTodosCount">全部完成,你真是太優秀了!</span>
      <span v-else>添加我的第一个todo</span>
      <span v-if="todos.length || recycleBin.length">篩選:
      <el-button  v-if="leftTodosCount"
                  v-on:click="markAllAsCompleted"
                  type="primary" plain="">全部標為完成</el-button>
      <el-button  class="selected"
             v-on:click="intention='all'"
      >全部</el-button>
      <el-button v-if="leftTodosCount"
             v-on:click="intention='ongoing'"
      >進行中</el-button>
      <el-button v-if="completedTodosCount"
             v-on:click="intention='finished'"
      >已完成</el-button>
      <el-button v-if="completedTodosCount"
             v-on:click="clearCompleted"
      >清除已完成</el-button>
      <el-button
             v-on:click="clearAll"
             type="danger" plain>清除全部</el-button>
      <el-button v-if="recycleBin.length"

             v-on:click="intention='removed'">回收站</el-button>
    </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'to-do',
  data: function () {
    return {
      todos: [],
      newTodoTitle: '',
      checkEmpty: false, // 增加一个检查空值标志
      removedTodo: null,
      editedTodo: null, // 用于暂存编辑前的 todo 状态
      intention: 'all', // 默认为 all
      recycleBin: [], // 用于存放已经删除的 todo
      checked: false
    }
  },
  methods: {
    addTodo: function () {
      let id = 0 // 用于 id 生成
      if (this.newTodoTitle === '') {
        this.checkEmpty = true
        return
      }
      this.checkEmpty = false
      this.todos.push(
        // 修改后的 todo 模型
        {id: id++, title: this.newTodoTitle, completed: false, removed: false}
      )
      this.newTodoTitle = ''
    },
    markAsCompleted: function (todo) {
      todo.completed = true
    },
    markAsUncompleted: function (todo) {
      todo.completed = false
    },
    removeTodo: function (todo) {
      let removedTodo = this.todos.splice(this.todos.indexOf(todo), 1)[0]
      removedTodo.removed = true
      this.recycleBin.unshift(removedTodo)
    },
    restoreTodo: function () {
      const todo = {id: 1, title: 'todo', completed: false}
      todo.removed = false
      this.todos.unshift(todo)
      let pos = this.recycleBin.indexOf(todo)
      this.recycleBin.splice(pos, 1)
    },
    editTodo: function (todo) {
      this.editedTodo = {id: todo.id, title: todo.title}
    },
    editDone: function (todo) {
      if (todo.title === '') {
        this.removeTodo(todo)
      }
      this.editedTodo = null
    },
    cancelEdit: function (todo) {
      todo.title = this.editedTodo.title
      this.editedTodo = null
    },
    markAllAsCompleted: function () {
      this.todos.map(function (todo) {
        if (!todo.completed) {
          todo.completed = true
        }
      })
    },
    clearCompleted: function () {
      if (!confirm('確認清除全部已完成的待辦事项?')) {
        return
      }
      this.completedTodos.map(todo => todo.removed = true)
      this.recycleBin.unshift(...this.completedTodos)
      this.todos = this.leftTodos
    },
    clearAll: function () {
      if (!confirm('確認清除全部待辦事项?')) {
        return
      }
      this.todos.map(todo => todo.removed = true)
      this.recycleBin.unshift(...this.todos)
      this.todos = []
    }

  },
  computed: {
    emptyChecked: function () {
      return this.newTodoTitle.length === 0 && this.checkEmpty
    },
    hasRemovedTodo: function () {
      return !!this.removedTodo
    },
    leftTodos: function () {
      return this.todos.filter(todo => !todo.finished)
    },
    leftTodosCount: function () {
      return this.leftTodos.length
    },
    filteredTodos: function () {
      if (this.intention === 'ongoing') {
        return this.leftTodos
      } else if (this.intention === 'completed') {
        return this.completedTodos
      } else if (this.intention === 'removed') {
        return this.recycleBin
      } else {
        // 其它未定义的意图我们为其返回全部 todos
        // 这里面已经包含了 all 意图了
        return this.todos
      }
    },
    completedTodos: function () {
      return this.todos.filter(todo => todo.completed)
    },
    completedTodosCount: function () {
      return this.completedTodos.length
    }

  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  }
}
</script>

<style>
.completed {
  text-decoration: line-through;
}
.selected {
  color: red;
}
.empty {
  border-color: red;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.row-bg {
  padding: 10px 0px;
}
.el-input {
  width: 70%;
}
.el-button {
  margin-left: 10px;
}
.mainButton {
  display: inline-block;
  float: right;
  margin-right: 10px;
}
.addList {
  border: solid 1px lightgray;
}

.addListTitle {
  text-align: right;
  color: red;
}

.hTitle {
  position: relative;
  left: -32%;
  font-size: 40px;
}
</style>
