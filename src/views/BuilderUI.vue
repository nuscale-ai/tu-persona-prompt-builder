<script setup>
import { ref } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Dropdown from 'primevue/dropdown';

const selectedPersona = ref(null);
const personas = [
  { name: 'Credit Agent Library', code: 'agent' },
  { name: 'Credit Risk Template', code: 'risk' },
  { name: 'Credit Marketing Template', code: 'marketing' },
  { name: 'Credit Loan Enquiry Template', code: 'loan' }
];

const sectionOpen = ref({
  role: true,
  background: false,
  instructions: false,
  schema: false,
  rules: false,
  examples: false,
});

const fewShotExamples = [
  {
    natural: "Find high-risk customers with low FICO and high utilization",
    code: `SELECT
    t1.consumer_id AS consumer_id,
    t1.evtg04_finscore AS fico_score,
    t2.eads142_bc34s AS bankcard_utilization,
    t2.eads142_g001b AS dpd_30plus_past_due_12m
FROM
    \`edl-idaas-demo-platform-b447.idaas.a1000104_active_v1\` AS t1
INNER JOIN
    \`edl-idaas-demo-platform-b447.idaas.a1000097_active_v1\` AS t2 ON t1.consumer_id = t2.consumer_id
WHERE t1.evtg04_finscore < 600
  AND t2.eads142_bc34s > 80
LIMIT 5;`
  },
  {
    natural: "Identify customers with high credit utilization and low open-to-buy amounts",
    code: `SELECT
    t1.consumer_id,
    t1.eads137_lagg905,
    t2.eads58_rev319
FROM
    \`edl-idaas-demo-platform-b447.idaas.a1000078_active_v1\` AS t1
INNER JOIN
    \`edl-idaas-demo-platform-b447.idaas.a1000094_active_v1\` AS t2 ON t1.consumer_id = t2.consumer_id
WHERE t1.eads137_lagg905 > 0.75
AND t2.eads58_rev319 < 1000
LIMIT 5`
  },
  {
    natural: "How many customers have made excess payments in the past 6 months?",
    code: `SELECT
    count(DISTINCT t1.consumer_id)
FROM
    \`edl-idaas-demo-platform-b447.idaas.a1000065_active_v1\` AS t1
WHERE t1.ead52ep2_all233 > 0`
  },
  {
    natural: "What is the average no of trades per customer?",
    code: `SELECT avg( t1.eads142_at01s) AS average_trades_per_customer
FROM \`edl-idaas-demo-platform-b447.idaas.a1000097_active_v1\` AS t1`
  }
];

const toggleSection = (key) => {
  sectionOpen.value[key] = !sectionOpen.value[key];
};
</script>

<template>
  <div class="p-2 h-full text-[13px] font-sans text-[#1a1a1a] bg-[#f8f9fb]">
    <div class="flex flex-col h-full">
      <!-- Toolbar -->
      <div class="bg-white h-11 flex items-center px-4 shadow-sm">
        <div class="flex items-center gap-2 text-xs font-semibold text-gray-700">
          Prompt Designer
        </div>
        <div class="ml-auto flex gap-2 text-[11px]">
          <Button label="Preview" icon="pi pi-eye" text class="px-2 py-1" />
          <Button label="Test" icon="pi pi-bolt" text class="px-2 py-1" />
          <Button label="Save" icon="pi pi-save" text class="px-2 py-1" />
          <Button label="Export" icon="pi pi-upload" text class="px-2 py-1" />
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="flex-1 flex overflow-hidden">
        <!-- Sidebar -->
        <div class="w-60 bg-white p-3 text-[11px]">
          <div class="font-semibold uppercase text-gray-500 mb-2">Personas</div>
          <div class="space-y-2">
            <Dropdown 
              v-model="selectedPersona" 
              :options="personas" 
              optionLabel="name" 
              placeholder="Select a Persona" 
              class="w-full text-xs"
            />
          </div>
        </div>

        <!-- Editor -->
        <div class="flex-1 overflow-auto p-4 space-y-4 bg-white">
          <!-- Role Definition Section -->
          <div class="rounded shadow-sm bg-white">
            <div
              @click="toggleSection('role')"
              class="flex items-center justify-between p-3 bg-gray-50 cursor-pointer text-sm font-semibold"
            >
              <div class="flex items-center gap-2">
                <i class="pi pi-user text-red-400"></i> Role Definition
              </div>
              <div class="flex items-center gap-3 text-xs text-gray-500">
                <span class="text-green-600 font-bold">95%</span>
                <span>128 tokens</span>
                <i :class="sectionOpen.role ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"></i>
              </div>
            </div>
            <div v-if="sectionOpen.role" class="p-4 space-y-3 text-sm">
              <div>
                <label class="text-xs font-semibold mb-1 block">Role Content</label>
                <Textarea
                  class="w-full text-sm"
                  modelValue="I am a SQL Query Creation Agent, specialized in generating accurate and syntactically correct BigQuery SQL queries for credit risk analysts working with credit bureau data."
                  rows="3"
                  autoResize
                />
              </div>
              <div class="pt-3 mt-2 flex justify-between items-center">
                <div class="flex gap-2">
                  <Button label="Enhance" text class="text-xs px-2 py-1 rounded" />
                  <Button label="Validate" text class="text-xs px-2 py-1 rounded" />
                  <Button label="Clear" text class="text-xs px-2 py-1 rounded" />
                </div>
                <span class="text-xs text-gray-400">128 tokens</span>
              </div>
            </div>
          </div>

          <!-- Background Section -->
          <div class="rounded shadow-sm bg-white">
            <div
              @click="toggleSection('background')"
              class="flex items-center justify-between p-3 bg-gray-50 cursor-pointer text-sm font-semibold"
            >
              <div class="flex items-center gap-2">
                <i class="pi pi-info-circle text-yellow-400"></i> Background Context
              </div>
              <div class="flex items-center gap-3 text-xs text-gray-500">
                <span class="text-green-600 font-bold">92%</span>
                <span>856 tokens</span>
                <i :class="sectionOpen.background ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"></i>
              </div>
            </div>
            <div v-if="sectionOpen.background" class="p-4 space-y-3 text-sm">
              <div>
                <label class="text-xs font-semibold mb-1 block">Background Content</label>
                <Textarea
                  class="w-full text-sm"
                  modelValue="My primary function is to translate credit risk analyst questions into executable SQL queries for a BigQuery database containing credit bureau data. This data includes consumer credit histories, trade lines, inquiries, and risk indicators that are critical for credit risk assessment. The data is already derived and pre-aggregated at the consumer level.

The database contains a rich collection of credit bureau datasets that have been carefully processed, standardized, and pre-aggregated at the consumer level to support efficient risk analysis. These datasets represent years of consumer credit behavior patterns, payment histories, and risk indicators that are essential for:
- Credit underwriting and approval decisions
- Portfolio risk monitoring and management
- Regulatory compliance reporting
- Predictive modeling and analytics
- Customer segmentation and targeting

**Core Data Categories:**
1. **Consumer Credit Profiles**: Comprehensive credit histories including FICO scores, credit age, and overall creditworthiness indicators
2. **Trade Line Data**: Detailed account-level information covering bankcards, installment loans, revolving credit, retail accounts, and mortgages
3. **Payment Behavior**: Historical payment patterns, delinquency records, charge-offs, and recovery data
4. **Credit Utilization Metrics**: Balance-to-limit ratios, open-to-buy amounts, and credit capacity utilization across account types
5. **Inquiry Data**: Hard and soft credit inquiries indicating credit-seeking behavior and application velocity
6. **Risk Indicators**: Pre-calculated risk scores, behavioral flags, and early warning signals for potential defaults
7. **Demographic & Geographic Data**: Consumer attributes that influence credit risk assessment

**Business Context:**
Credit risk analysts using this system are typically focused on:
- Identifying high-risk customers before they default
- Optimizing credit line management and pricing strategies
- Monitoring portfolio health and early warning indicators
- Supporting regulatory stress testing and capital planning
- Developing predictive models for risk scoring"
                  rows="12"
                  autoResize
                />
              </div>
              <div class="pt-3 mt-2 flex justify-between items-center">
                <div class="flex gap-2">
                  <Button label="Enhance" text class="text-xs px-2 py-1 rounded" />
                  <Button label="Validate" text class="text-xs px-2 py-1 rounded" />
                  <Button label="Clear" text class="text-xs px-2 py-1 rounded" />
                </div>
                <span class="text-xs text-gray-400">856 tokens</span>
              </div>
            </div>
          </div>

          <!-- Instructions Section -->
          <div class="rounded shadow-sm bg-white">
            <div
              @click="toggleSection('instructions')"
              class="flex items-center justify-between p-3 bg-gray-50 cursor-pointer text-sm font-semibold"
            >
              <div class="flex items-center gap-2">
                <i class="pi pi-list text-blue-400"></i> Instructions
              </div>
              <div class="flex items-center gap-3 text-xs text-gray-500">
                <span class="text-green-600 font-bold">89%</span>
                <span>674 tokens</span>
                <i :class="sectionOpen.instructions ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"></i>
              </div>
            </div>
            <div v-if="sectionOpen.instructions" class="p-4 space-y-3 text-sm">
              <div>
                <label class="text-xs font-semibold mb-1 block">Instructions Content</label>
                <Textarea
                  class="w-full text-sm"
                  modelValue="- Receive Input: I will receive a natural language question from a credit risk analyst, which represents their data request.
- Table Identification: I will use the list_relevant_tables tool to identify the tables in the database that are most likely to contain the credit data needed to answer the analyst's question.
- Schema Analysis: I will carefully analyze the schema information returned by list_relevant_tables, paying special attention to:
  - Asset summaries to identify the right tables for credit risk analysis
  - Column descriptions to identify pre-aggregated credit metrics and risk indicators
  - Sample data to understand the format and nature of the data
- Query Construction: I will construct a syntactically correct BigQuery SQL query based on the analyst's question and the schema information.
  - I will use fully qualified table names in the query, including the project ID 'edl-idaas-demo-platform-b447' and dataset ID 'idaas'
  - I will maintain exact column names and pickup correct bigquery table names in the query logic
  - I will use proper table aliases (e.g., t1, t2) and reference columns with these aliases
  - I will alias all columns in SELECT statements with descriptive names that reflect their credit risk meaning
  - I will use joins appropriately when analysis requires data from multiple tables
  - I will use joins between multiple tables based on consumer_id column to join attributes present in different tables.
  - I will limit results to TOP 50 unless otherwise specified
  - I will ensure CASE statements for risk segmentation are mutually exclusive and collectively exhaustive
- Data Handling Considerations:
  - I will recognize that many columns already contain pre-calculated counts, sums, and other aggregations at the consumer level
  - I will use these pre-aggregated fields directly rather than recalculating them with SQL aggregation functions
  - I will note that date columns are already in proper date/timestamp format and only use conversion functions if string dates are observed in sample data
  - I will recognize that consumer_id is the primary key linking consumers across tables
- Query Return: I will return the SQL query as the final answer.
- Handling Irrelevant Questions: If the analyst's input is a greeting or an irrelevant question, I will not call any tools and will synthesize a suitable chat response."
                  rows="10"
                  autoResize
                />
              </div>
              <div class="pt-3 mt-2 flex justify-between items-center">
                <div class="flex gap-2">
                  <Button label="Enhance" text class="text-xs px-2 py-1 rounded" />
                  <Button label="Validate" text class="text-xs px-2 py-1 rounded" />
                  <Button label="Clear" text class="text-xs px-2 py-1 rounded" />
                </div>
                <span class="text-xs text-gray-400">674 tokens</span>
              </div>
            </div>
          </div>

          <!-- Schema Section -->
          <div class="rounded shadow-sm bg-white">
            <div
              @click="toggleSection('schema')"
              class="flex items-center justify-between p-3 bg-gray-50 cursor-pointer text-sm font-semibold"
            >
              <div class="flex items-center gap-2">
                <i class="pi pi-database text-purple-400"></i> Schema
              </div>
              <div class="flex items-center gap-3 text-xs text-gray-500">
                <span class="text-gray-500 font-bold">--</span>
                <span>0 tokens</span>
                <i :class="sectionOpen.schema ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"></i>
              </div>
            </div>
            <div v-if="sectionOpen.schema" class="p-4 space-y-3 text-sm">
              <div>
                <label class="text-xs font-semibold mb-1 block">Schema Content</label>
                <Textarea
                  class="w-full text-sm"
                  modelValue=""
                  placeholder="Schema information will be dynamically populated based on the selected dataset..."
                  rows="4"
                  autoResize
                />
              </div>
              <div class="pt-3 mt-2 flex justify-between items-center">
                <div class="flex gap-2">
                  <Button label="Load Schema" text class="text-xs px-2 py-1 rounded" />
                  <Button label="Clear" text class="text-xs px-2 py-1 rounded" />
                </div>
                <span class="text-xs text-gray-400">0 tokens</span>
              </div>
            </div>
          </div>

          <!-- Rules Section -->
          <div class="rounded shadow-sm bg-white">
            <div
              @click="toggleSection('rules')"
              class="flex items-center justify-between p-3 bg-gray-50 cursor-pointer text-sm font-semibold"
            >
              <div class="flex items-center gap-2">
                <i class="pi pi-shield text-orange-400"></i> Rules
              </div>
              <div class="flex items-center gap-3 text-xs text-gray-500">
                <span class="text-green-600 font-bold">96%</span>
                <span>243 tokens</span>
                <i :class="sectionOpen.rules ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"></i>
              </div>
            </div>
            <div v-if="sectionOpen.rules" class="p-4 space-y-3 text-sm">
              <div>
                <label class="text-xs font-semibold mb-1 block">Rules Content</label>
                <Textarea
                  class="w-full text-sm"
                  modelValue="- Always use list_relevant_tables first.
- Pass the user input question as is to the list_relevant_tables tool.
- Use fully qualified table names with backticks in the generated SQL query (e.g., \`edl-idaas-demo-platform-b447.idaas.table_name\`).
- Do not apply COUNT or SUM to fields that are already aggregated in the source data.
- Do not use PARSE_TIMESTAMP on columns that are already in date format.
- Only use single quotes in SQL queries, never double quotes.
- Never generate DML statements (INSERT, UPDATE, DELETE, DROP).
- Do not use functions not supported in BigQuery (like YEAR or GROUP_CONCAT).
- Limit the use of resource-intensive operations.
- Always check sample values to understand data formats before applying conversions."
                  rows="6"
                  autoResize
                />
              </div>
              <div class="pt-3 mt-2 flex justify-between items-center">
                <div class="flex gap-2">
                  <Button label="Enhance" text class="text-xs px-2 py-1 rounded" />
                  <Button label="Validate" text class="text-xs px-2 py-1 rounded" />
                  <Button label="Clear" text class="text-xs px-2 py-1 rounded" />
                </div>
                <span class="text-xs text-gray-400">243 tokens</span>
              </div>
            </div>
          </div>

          <!-- Few Shot Examples Section -->
          <div class="rounded shadow-sm bg-white">
            <div
              @click="toggleSection('examples')"
              class="flex items-center justify-between p-3 bg-gray-50 cursor-pointer text-sm font-semibold"
            >
              <div class="flex items-center gap-2">
                <i class="pi pi-code text-green-400"></i> Few Shot Examples
              </div>
              <div class="flex items-center gap-3 text-xs text-gray-500">
                <span class="text-green-600 font-bold">94%</span>
                <span>{{ fewShotExamples.length }} examples</span>
                <i :class="sectionOpen.examples ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"></i>
              </div>
            </div>
            <div v-if="sectionOpen.examples" class="p-4 space-y-4 text-sm">
              <div class="space-y-4">
                <div v-for="(example, index) in fewShotExamples" :key="index" class="p-3 bg-gray-50 rounded">
                  <div class="mb-2">
                    <label class="text-xs font-semibold text-blue-600 block">Natural Language:</label>
                    <p class="text-sm text-gray-700 mt-1">{{ example.natural }}</p>
                  </div>
                  <div>
                    <label class="text-xs font-semibold text-green-600 block">SQL Code:</label>
                    <pre class="text-xs bg-white p-2 rounded mt-1 overflow-x-auto text-gray-800 font-mono">{{ example.code }}</pre>
                  </div>
                </div>
              </div>
              <div class="pt-3 mt-2 flex justify-between items-center">
                <div class="flex gap-2">
                  <Button label="Add Example" text class="text-xs px-2 py-1 rounded" />
                  <Button label="Import" text class="text-xs px-2 py-1 rounded" />
                  <Button label="Clear All" text class="text-xs px-2 py-1 rounded" />
                </div>
                <span class="text-xs text-gray-400">{{ fewShotExamples.length }} examples</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Assistant Panel -->
        <div class="w-72 bg-gray-50 p-3 text-[11px] flex flex-col">
          <div class="font-semibold text-gray-600 mb-2">AI Assistant</div>
          <div class="flex-1 space-y-2 overflow-auto">
            <div class="flex items-start gap-2">
              <i class="pi pi-robot text-blue-500"></i>
              <div class="bg-white rounded p-2 shadow-sm">Need help refining the role?</div>
            </div>
            <div class="flex items-start gap-2">
              <i class="pi pi-user text-gray-400"></i>
              <div class="bg-white rounded p-2 shadow-sm">Yes, review the background.</div>
            </div>
          </div>
          <div class="mt-auto pt-2">
            <Textarea placeholder="Ask me anything..." class="w-full text-[11px]" rows="2" autoResize />
          </div>
        </div>
      </div>

      <!-- Footer -->
      
    </div>
  </div>
</template>