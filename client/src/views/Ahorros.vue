<template>
  <v-container>
    <h2>Ahorros</h2>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Nueva Meta de Ahorro</v-card-title>
          <v-card-text>
            <v-text-field label="Título" v-model="newSavingsGoal.title"></v-text-field>
            <v-text-field label="Meta" type="number" :value="newSavingsGoal.target" @input="newSavingsGoal.target = parseFloat($event)"></v-text-field>
            <div class="d-flex align-center">
              <v-btn @click="addSavingsGoal">Agregar Meta</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <div v-for="goal in savingsGoals" :key="goal.id" class="mb-4">
          <v-card>
            <v-card-title>{{ goal.title }}</v-card-title>
            <v-card-text>
              <p>Meta: ${{ goal.target.toFixed(2) }}</p>
              <p>Actual: <span class="text-success">${{ goal.currentAmount.toFixed(2) }}</span></p>
              <div class="d-flex align-center">
                <v-text-field :label="`Agregar a '${goal.title}'`" type="number" :value="goal.newSavingsAmount" @input="goal.newSavingsAmount = parseFloat($event)" class="mr-4"></v-text-field>
                <v-btn @click="addToSavings(goal)">Agregar</v-btn>
                <v-btn @click="completeGoal(goal)" v-if="!goal.completed" color="success" class="ml-4">Completar</v-btn>
                <v-btn @click="deleteGoal(goal)" color="error" class="ml-4">Eliminar</v-btn>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Resumen de Ahorros</v-card-title>
          <v-card-text>
            <p>Disponible para Ahorros: <span class="text-success">${{ availableForSavings.toFixed(2) }}</span></p>
            <p>Total Ahorros: ${{ savingsGoals.reduce((sum, goal) => sum + goal.currentAmount, 0).toFixed(2) }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Ahorros',
  data() {
    return {
      incomeList: [],
      expenseList: [],
      savingsGoals: [],
      newSavingsGoal: {
        id: 0,
        title: '',
        target: 0,
        currentAmount: 0,
        completed: false,
        newSavingsAmount: 0
      },
      newSavingsAmount: 0
    }
  },
  created() {
    this.loadFinanceData();
  },
  computed: {
    totalIncome() {
      return this.incomeList.reduce((sum, income) => sum + Number(income.amount), 0);
    },
    totalExpense() {
      return this.expenseList.reduce((sum, expense) => sum + Number(expense.amount), 0);
    },
    availableForSavings() {
      return this.totalIncome - this.totalExpense - this.savingsGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);
    }
  },
  methods: {
    loadFinanceData() {
      const storedIncome = localStorage.getItem('incomeList');
      const storedExpense = localStorage.getItem('expenseList');
      const storedSavingsGoals = localStorage.getItem('savingsGoals');

      if (storedIncome) {
        this.incomeList = JSON.parse(storedIncome).map(income => ({
          ...income,
          amount: Number(income.amount)
        }));
      }

      if (storedExpense) {
        this.expenseList = JSON.parse(storedExpense).map(expense => ({
          ...expense,
          amount: Number(expense.amount)
        }));
      }

      if (storedSavingsGoals) {
        this.savingsGoals = JSON.parse(storedSavingsGoals);
      }
    },
    addSavingsGoal() {
      if (this.newSavingsGoal.title && this.newSavingsGoal.target > 0) {
        this.savingsGoals.push({
          ...this.newSavingsGoal,
          id: this.savingsGoals.length,
          newSavingsAmount: 0
        });
        this.newSavingsGoal = {
          id: 0,
          title: '',
          target: 0,
          currentAmount: 0,
          completed: false,
          newSavingsAmount: 0
        };
        this.saveFinanceData();
      }
    },
    addToSavings(goal) {
      if (goal.newSavingsAmount <= this.availableForSavings) {
        goal.currentAmount += goal.newSavingsAmount;
        goal.target -= goal.newSavingsAmount;
        goal.newSavingsAmount = 0;
        this.saveFinanceData();
      }
    },
    completeGoal(goal) {
      goal.completed = true;
      this.saveFinanceData();
    },
    deleteGoal(goal) {
      this.savingsGoals = this.savingsGoals.filter(g => g.id !== goal.id);
      this.saveFinanceData();
    },
    saveFinanceData() {
      localStorage.setItem('incomeList', JSON.stringify(this.incomeList));
      localStorage.setItem('expenseList', JSON.stringify(this.expenseList));
      localStorage.setItem('savingsGoals', JSON.stringify(this.savingsGoals));
    }
  }
}
</script>