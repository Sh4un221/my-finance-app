<template>
  <v-container>
    <h2>Resumen de Finanzas</h2>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Balance General</v-card-title>
          <v-card-text>
            <p>Total de Ingresos: {{ totalIncome.toFixed(2) }}</p>
            <p>Total de Gastos: {{ totalExpense.toFixed(2) }}</p>
            <p :class="{ 'text-success': balance >= 0, 'text-error': balance < 0 }">
              Balance: {{ balance.toFixed(2) }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Resumen Mensual</v-card-title>
          <v-card-text>
            <p>Mes actual: {{ currentMonth }}</p>
            <p>Gastos mensuales necesarios: {{ monthlyExpenses.toFixed(2) }}</p>
            <p class="text-success">Disponible para ahorros: {{ availableForSavings.toFixed(2) }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'FinanceSummary',
  data() {
    return {
      incomeList: [],
      expenseList: []
    }
  },
  created() {
    this.loadFinanceData()
  },
  computed: {
    totalIncome() {
      return this.incomeList.reduce((sum, income) => sum + Number(income.amount), 0)
    },
    totalExpense() {
      return this.expenseList.reduce((sum, expense) => sum + Number(expense.amount), 0)
    },
    balance() {
      return this.totalIncome - this.totalExpense
    },
    currentMonth() {
      return new Date().toLocaleString('default', { month: 'long' })
    },
    monthlyExpenses() {
      return this.expenseList.filter(expense => expense.priority === 'necesario')
                            .reduce((sum, expense) => sum + Number(expense.amount), 0)
    },
    availableForSavings() {
      return this.totalIncome - this.monthlyExpenses
    }
  },
  methods: {
    loadFinanceData() {
      const storedIncome = localStorage.getItem('incomeList')
      const storedExpense = localStorage.getItem('expenseList')

      if (storedIncome) {
        this.incomeList = JSON.parse(storedIncome).map(income => ({
          ...income,
          amount: Number(income.amount)
        }))
      }

      if (storedExpense) {
        this.expenseList = JSON.parse(storedExpense).map(expense => ({
          ...expense,
          amount: Number(expense.amount)
        }))
      }
    }
  }
}
</script>