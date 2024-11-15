<template>
  <v-container>
    <h2 class="text-center mb-4">Resumen de Finanzas</h2>
    <v-row>
      <!-- Tarjeta de Balance General -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="headline">Balance General</v-card-title>
          <v-card-text>
            <p><strong>Total de Ingresos:</strong> {{ totalIncome.toFixed(2) }}</p>
            <p><strong>Total de Gastos:</strong> {{ totalExpense.toFixed(2) }}</p>
            <v-divider></v-divider>
            <p :class="{ 'text-success': balance >= 0, 'text-error': balance < 0 }">
              <strong>Balance:</strong> {{ balance.toFixed(2) }}
            </p>

            <!-- Barra de saldo disponible -->
            <v-progress-linear
              :value="balance > 0 ? (balance / totalIncome) * 100 : 0"
              color="green"
              height="15"
              class="mt-4"
              v-if="balance >= 0"
            ></v-progress-linear>
            <v-progress-linear
              :value="balance < 0 ? (Math.abs(balance) / totalIncome) * 100 : 0"
              color="red"
              height="15"
              class="mt-4"
              v-if="balance < 0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Tarjeta de Resumen Mensual -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="headline">Resumen Mensual</v-card-title>
          <v-card-text>
            <p><strong>Mes Actual:</strong> {{ currentMonth }}</p>
            <p><strong>Gastos mensuales necesarios:</strong> {{ monthlyExpenses.toFixed(2) }}</p>
            <p class="text-success"><strong>Disponible para ahorros:</strong> {{ availableForSavings.toFixed(2) }}</p>
            <v-divider></v-divider>
            <!-- Barra de ahorro disponible -->
            <v-progress-linear
              :value="(availableForSavings / totalIncome) * 100"
              color="blue"
              height="15"
              class="mt-4"
            ></v-progress-linear>
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

<style scoped>
.text-center {
  text-align: center;
}

.mb-4 {
  margin-bottom: 16px;
}

.headline {
  font-weight: 600;
}

.text-success {
  color: #4CAF50;
}

.text-error {
  color: #f44336;
}

.mt-4 {
  margin-top: 16px;
}
</style>
