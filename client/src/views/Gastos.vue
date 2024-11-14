<template>
  <div class="expense-list-container">
    <h2>Gastos</h2>
    <div class="expense-list">
      <div class="expense-item" v-for="(expense, index) in expenseList" :key="index">
        <div class="expense-info">
          <input v-if="expense.isEditing" v-model="expense.name" class="expense-name-input" />
          <span v-else class="expense-name">{{ expense.name }}</span>
          <input v-if="expense.isEditing" v-model="expense.amount" class="expense-amount-input" type="number" />
          <span v-else class="expense-amount">{{ expense.amount.toFixed(2) }}</span>
          <div class="expense-priority" :class="{ 'necesario': expense.priority === 'necesario', 'deseado': expense.priority === 'deseado' }">
            {{ expense.priority }}
          </div>
        </div>
        <div class="expense-progress">
          <div class="progress-bar" :style="{ width: getPercentage(expense.amount), backgroundColor: expense.priority === 'necesario' ? '#F44336' : '#FFA726' }"></div>
          <span class="progress-percentage">{{ getPercentage(expense.amount) }}</span>
        </div>
        <div class="expense-actions">
          <v-btn v-if="!expense.isEditing" @click="editExpense(index)" icon><v-icon>mdi-pencil</v-icon></v-btn>
          <v-btn v-else @click="saveExpense(index)" icon><v-icon>mdi-check</v-icon></v-btn>
          <v-btn @click="deleteExpense(index)" icon><v-icon>mdi-delete</v-icon></v-btn>
        </div>
      </div>
    </div>
    <div class="add-expense">
      <v-text-field v-model="newExpenseName" label="Nuevo Gasto" />
      <v-text-field v-model="newExpenseAmount" label="Monto" type="number" />
      <v-select v-model="newExpensePriority" :items="['necesario', 'deseado']" label="Prioridad" />
      <v-btn @click="addExpense" color="primary">Agregar</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExpenseList',
  data() {
    return {
      expenseList: [],
      newExpenseName: '',
      newExpenseAmount: 0,
      newExpensePriority: 'necesario'
    }
  },
  created() {
    this.loadExpenseFromStorage();
  },
  methods: {
    loadExpenseFromStorage() {
      const storedExpense = localStorage.getItem('expenseList');
      if (storedExpense) {
        this.expenseList = JSON.parse(storedExpense).map(expense => ({
          ...expense,
          amount: Number(expense.amount)
        }));
      }
    },
    saveExpenseToStorage() {
      localStorage.setItem('expenseList', JSON.stringify(this.expenseList));
    },
    addExpense() {
      if (this.newExpenseName && this.newExpenseAmount > 0) {
        this.expenseList.push({
          name: this.newExpenseName,
          amount: Number(this.newExpenseAmount),
          priority: this.newExpensePriority,
          isEditing: false
        });
        this.newExpenseName = '';
        this.newExpenseAmount = 0;
        this.newExpensePriority = 'necesario';
        this.saveExpenseToStorage();
      }
    },
    editExpense(index) {
      this.expenseList[index].isEditing = true;
    },
    saveExpense(index) {
      this.expenseList[index].isEditing = false;
      this.saveExpenseToStorage();
    },
    deleteExpense(index) {
      this.expenseList.splice(index, 1);
      this.saveExpenseToStorage();
    },
    getPercentage(amount) {
      const totalExpense = this.expenseList.reduce((sum, expense) => sum + Number(expense.amount), 0);
      return `${(Number(amount) / totalExpense * 100).toFixed(2)}%`;
    }
  }
}
</script>

<style scoped>
.expense-list-container {
  display: flex;
  width: 100%;
  height: auto;
  max-height: 100vh;
  flex-direction: column;
}
.expense-list {
  max-height: 300px;
  overflow-y: auto;
}
.expense-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}
.expense-info {
  display: flex;
  justify-content: space-between;
  width: 40%;
}
.expense-name, .expense-amount {
  font-weight: bold;
}
.expense-name-input, .expense-amount-input {
  width: 100px;
  padding: 4px;
}
.expense-priority {
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 4px;
}
.necesario {
  background-color: #F44336;
  color: white;
}
.deseado {
  background-color: #FFA726;
  color: white;
}
.expense-progress {
  display: flex;
  align-items: center;
  width: 30%;
}
.progress-bar {
  flex-grow: 1;
  height: 20px;
}
.progress-percentage {
  margin-left: 8px;
}
.expense-actions {
  width: 20%;
  display: flex;
  justify-content: flex-end;
}
.add-expense {
  display: flex;
  margin-top: 16px;
  gap: 16px;
}
</style>