<template>
  <v-container>
    <h2 class="text-center mb-4">Gastos</h2>
    <v-card>
      <v-card-text>
        <v-list>
          <v-list-item v-for="(expense, index) in expenseList" :key="index">
            <v-list-item-content>
              <v-list-item-title>
                <v-text-field 
                  v-if="expense.isEditing" 
                  v-model="expense.name" 
                  class="expense-name-input" 
                  label="Nombre del Gasto" 
                  outlined
                  dense
                />
                <span v-else class="expense-name">{{ expense.name }}</span>
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-text-field 
                  v-if="expense.isEditing" 
                  v-model="expense.amount" 
                  class="expense-amount-input" 
                  label="Monto" 
                  type="number" 
                  outlined
                  dense
                />
                <span v-else class="expense-amount">{{ expense.amount.toFixed(2) }}</span>
                <v-chip 
                  :class="{
                    'red accent-2 white--text': expense.priority === 'necesario', 
                    'orange accent-3 white--text': expense.priority === 'deseado'
                  }" 
                  class="ml-4"
                >
                  {{ expense.priority }}
                </v-chip>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn v-if="!expense.isEditing" @click="editExpense(index)" icon><v-icon>mdi-pencil</v-icon></v-btn>
              <v-btn v-else @click="saveExpense(index)" icon><v-icon>mdi-check</v-icon></v-btn>
              <v-btn @click="deleteExpense(index)" icon><v-icon>mdi-delete</v-icon></v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <!-- Formulario para agregar un nuevo gasto -->
    <v-card class="mt-4">
      <v-card-title class="headline">Nuevo Gasto</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field 
              v-model="newExpenseName" 
              label="Nuevo Gasto" 
              outlined 
              dense 
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field 
              v-model="newExpenseAmount" 
              label="Monto" 
              type="number" 
              outlined 
              dense 
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-select 
              v-model="newExpensePriority" 
              :items="['necesario', 'deseado']" 
              label="Prioridad" 
              outlined 
              dense 
            />
          </v-col>
          <v-col cols="12" class="d-flex justify-center">
            <v-btn 
              @click="addExpense" 
              color="primary" 
              class="mt-4"
              outlined
            >
              Agregar
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
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
    };
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
    }
  }
};
</script>

<style scoped>
.expense-name, .expense-amount {
  font-weight: bold;
}
.expense-name-input, .expense-amount-input {
  width: 100%;
  padding: 4px;
}
.mt-4 {
  margin-top: 16px;
}
.ml-4 {
  margin-left: 16px;
}
</style>
