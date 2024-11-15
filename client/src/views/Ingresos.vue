<template>
  <v-container>
    <h2>Ingresos</h2>
    <v-card>
      <v-card-text>
        <v-list>
          <v-list-item v-for="(income, index) in incomeList" :key="index">
            <v-list-item-content>
              <v-list-item-title>
                <v-text-field v-if="income.isEditing" v-model="income.name" class="income-name-input"
                  prepend-icon="mdi-cash" />
                <span v-else class="income-name">{{ income.name }}</span>
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-text-field v-if="income.isEditing" v-model="income.amount" class="income-amount-input"
                  prepend-icon="mdi-currency-usd" type="number" />
                <span v-else class="income-amount">{{ income.amount.toFixed(2) }}</span>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn v-if="!income.isEditing" @click="editIncome(index)" icon><v-icon>mdi-pencil</v-icon></v-btn>
              <v-btn v-else @click="saveIncome(index)" icon><v-icon>mdi-check</v-icon></v-btn>
              <v-btn @click="deleteIncome(index)" icon><v-icon>mdi-delete</v-icon></v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
    
    <!-- Tarjeta para agregar ingresos -->
    <v-card class="mt-4">
      <v-card-text class="d-flex flex-column justify-center align-center">
        <v-row class="d-flex justify-space-between">
          <!-- Campo para nombre de ingreso -->
          <v-col cols="12" sm="6" md="4" class="d-flex justify-start my-2">
            <v-text-field v-model="newIncomeName" label="Nombre del Ingreso" prepend-icon="mdi-cash" class="w-100" />
          </v-col>
          <!-- Campo para cantidad -->
          <v-col cols="12" sm="6" md="4" class="d-flex justify-start my-2">
            <v-text-field v-model="newIncomeAmount" label="Cantidad en $" prepend-icon="mdi-currency-usd" type="number"
              class="w-100" />
          </v-col>
          <!-- Botón para agregar -->
          <v-col cols="12" sm="6" md="4" class="d-flex justify-center my-6">
            <v-btn @click="addIncome" color="primary" class="w-100">
              Agregar
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>


    <!-- Tarjeta para mostrar el total -->
    <v-card class="mt-4">
      <v-card-text>
        <div class="total-text">
          Total: {{ incomeList.reduce((sum, income) => sum + Number(income.amount), 0).toLocaleString('es-ES', {
            style:
              'currency', currency: 'COP' }) }}
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'IncomeList',
  data() {
    return {
      incomeList: [],
      newIncomeName: '',
      newIncomeAmount: 0
    };
  },
  created() {
    this.loadIncomeFromStorage();
  },
  methods: {
    loadIncomeFromStorage() {
      const storedIncome = localStorage.getItem('incomeList');
      if (storedIncome) {
        this.incomeList = JSON.parse(storedIncome).map(income => ({
          ...income,
          amount: Number(income.amount)
        }));
      }
    },
    saveIncomeToStorage() {
      localStorage.setItem('incomeList', JSON.stringify(this.incomeList));
    },
    addIncome() {
      if (this.newIncomeName.trim() === '' || this.newIncomeAmount <= 0) {
        alert('Por favor, complete todos los campos correctamente.');
        return;
      }

      this.incomeList.push({
        name: this.newIncomeName,
        amount: Number(this.newIncomeAmount),
        isEditing: false
      });
      this.newIncomeName = '';
      this.newIncomeAmount = 0;
      this.saveIncomeToStorage();
    },
    editIncome(index) {
      this.incomeList[index].isEditing = true;
    },
    saveIncome(index) {
      if (this.incomeList[index].name.trim() === '' || this.incomeList[index].amount <= 0) {
        alert('Por favor, complete todos los campos.');
        return;
      }

      // Garantizar que el monto sea un número
      this.incomeList[index].amount = Number(this.incomeList[index].amount);
      this.incomeList[index].isEditing = false;
      this.saveIncomeToStorage();
    },
    deleteIncome(index) {
      this.incomeList.splice(index, 1);
      this.saveIncomeToStorage();
    }
  }
}
</script>

<style scoped>
.income-name,
.income-amount {
  font-weight: bold;
}

.income-name-input,
.income-amount-input {
  width: 100%;
  padding: 4px;
}

.total-text {
  font-weight: 700;
  font-size: 25px;
  color: #4CAF50;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
</style>
