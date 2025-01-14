const lakehouseMatrix = [
    // 1) Data Storage
    {
      component: "Data Storage",
      technology: "AWS Managed",
      cost: "Low",
      price: 15,
      timeToMarket: "Low",
      timeToMarketDays: 4, 
      complexity: "Low"
    },
    {
      component: "Data Storage",
      technology: "Azure Managed",
      cost: "Low",
      price: 13,
      timeToMarket: "Low",
      timeToMarketDays: 5,
      complexity: "Low"
    },
    {
      component: "Data Storage",
      technology: "GCP Managed",
      cost: "Low",
      price: 15,
      timeToMarket: "Low",
      timeToMarketDays: 4,
      complexity: "Low"
    },
    {
      component: "Data Storage",
      technology: "Databricks Managed",
      cost: "-",
      price: 0,
      timeToMarket: "-",
      timeToMarketDays: 0,
      complexity: "-"
    },
    {
      component: "Data Storage",
      technology: "Self-Hosted",
      cost: "Moderate",
      price: 30,
      timeToMarket: "Moderate",
      timeToMarketDays: 14, 
      complexity: "High"
    },
  
    // 2) Data Ingestion
    {
      component: "Data Ingestion",
      technology: "AWS Managed",
      cost: "Low",
      price: 18,
      timeToMarket: "Low",
      timeToMarketDays: 7,  // Increased from 4; setting up ingestion pipelines with potential dev/test cycles
      complexity: "Low"
    },
    {
      component: "Data Ingestion",
      technology: "Azure Managed",
      cost: "Low",
      price: 18,
      timeToMarket: "Low",
      timeToMarketDays: 7,
      complexity: "Low"
    },
    {
      component: "Data Ingestion",
      technology: "GCP Managed",
      cost: "Low",
      price: 18,
      timeToMarket: "Low",
      timeToMarketDays: 7,
      complexity: "Low"
    },
    {
      component: "Data Ingestion",
      technology: "Databricks Managed",
      cost: "Moderate",
      price: 25,
      timeToMarket: "Low",
      timeToMarketDays: 5,  // Slight extension for cluster + pipeline config
      complexity: "Low"
    },
    {
      component: "Data Ingestion",
      technology: "Self-Hosted",
      cost: "Moderate",
      price: 15,
      timeToMarket: "Moderate",
      timeToMarketDays: 14, 
      complexity: "High"
    },
  
    // 3) Data Processing (ETL/ELT)
    {
      component: "Data Processing (ETL/ELT)",
      technology: "AWS Managed",
      cost: "Moderate",
      price: 40,
      timeToMarket: "Low",
      timeToMarketDays: 9,   // Up from 5 to 7, reflecting iteration with AWS Glue/Step Functions
      complexity: "Low"
    },
    {
      component: "Data Processing (ETL/ELT)",
      technology: "Azure Managed",
      cost: "Moderate",
      price: 42,
      timeToMarket: "Low",
      timeToMarketDays: 7,  // Up from 5, especially if orchestrating more complex Data Factory pipelines
      complexity: "Low"
    },
    {
      component: "Data Processing (ETL/ELT)",
      technology: "GCP Managed",
      cost: "Moderate",
      price: 40,
      timeToMarket: "Low",
      timeToMarketDays: 8,
      complexity: "Low"
    },
    {
      component: "Data Processing (ETL/ELT)",
      technology: "Databricks Managed",
      cost: "Moderate",
      price: 55,
      timeToMarket: "Low",
      timeToMarketDays: 5,
      complexity: "Low"
    },
    {
      component: "Data Processing (ETL/ELT)",
      technology: "Self-Hosted",
      cost: "Moderate",
      price: 30,
      timeToMarket: "Moderate",
      timeToMarketDays: 20,  // Increased from 28 to 45, Spark or other big data frameworks can be a slog
      complexity: "High"
    },
  
    // 4) Machine Learning Training
    {
      component: "Machine Learning Training",
      technology: "AWS Managed",
      cost: "Moderate",
      price: 80,
      timeToMarket: "Moderate",
      timeToMarketDays: 20, // Increased from 5, includes environment setup & iterative tuning
      complexity: "Moderate"
    },
    {
      component: "Machine Learning Training",
      technology: "Azure Managed",
      cost: "Moderate",
      price: 85,
      timeToMarket: "Moderate",
      timeToMarketDays: 22, // Increased from 6 to 14, possibly multiple experiment runs & AutoML configurations
      complexity: "Moderate"
    },
    {
      component: "Machine Learning Training",
      technology: "GCP Managed",
      cost: "Moderate",
      price: 75,
      timeToMarket: "Moderate",
      timeToMarketDays: 20, // Increased from 5, includes Vertex pipelines + hyperparameter tuning
      complexity: "Moderate"
    },
    {
      component: "Machine Learning Training",
      technology: "Databricks Managed",
      cost: "Moderate",
      price: 100,
      timeToMarket: "Low",
      timeToMarketDays: 15, // Up from 5, multiple cluster configs & MLflow setups
      complexity: "Moderate"
    },
    {
      component: "Machine Learning Training",
      technology: "Self-Hosted",
      cost: "High",
      price: 70,
      timeToMarket: "High",
      timeToMarketDays: 40,  // Increased from 30 to 60, HPC environment, MLOps tooling, GPU drivers, etc.
      complexity: "High"
    },
  
    // 5) Machine Learning Serving (Inference)
    {
      component: "Machine Learning Serving (Inference)",
      technology: "AWS Managed",
      cost: "High",
      price: 100,
      timeToMarket: "Low",
      timeToMarketDays: 7,  // Up from 4 to 7, testing endpoints, configuring auto-scaling, etc.
      complexity: "Low"
    },
    {
      component: "Machine Learning Serving (Inference)",
      technology: "Azure Managed",
      cost: "High",
      price: 100,
      timeToMarket: "Low",
      timeToMarketDays: 7,
      complexity: "Low"
    },
    {
      component: "Machine Learning Serving (Inference)",
      technology: "GCP Managed",
      cost: "High",
      price: 90,
      timeToMarket: "Low",
      timeToMarketDays: 7,
      complexity: "Low"
    },
    {
      component: "Machine Learning Serving (Inference)",
      technology: "Databricks Managed",
      cost: "High",
      price: 115,
      timeToMarket: "Low",
      timeToMarketDays: 5,
      complexity: "Low"
    },
    {
      component: "Machine Learning Serving (Inference)",
      technology: "Self-Hosted",
      cost: "Moderate",
      price: 80,
      timeToMarket: "High",
      timeToMarketDays: 20,  // Increased from 21 to 45, self-hosting container orchestration + rollout + monitoring
      complexity: "High"
    },
  
    // 6) Exploratory Data Analysis
    {
      component: "Exploratory Data Analysis",
      technology: "AWS Managed",
      cost: "Moderate",
      price: 25,
      timeToMarket: "Low",
      timeToMarketDays: 7,  // Increased from 2, actual data prep + learning the environment
      complexity: "Moderate"
    },
    {
      component: "Exploratory Data Analysis",
      technology: "Azure Managed",
      cost: "Moderate",
      price: 28,
      timeToMarket: "Low",
      timeToMarketDays: 7,  // Up from 3, might involve Synapse notebooks, linking to data, troubleshooting
      complexity: "Moderate"
    },
    {
      component: "Exploratory Data Analysis",
      technology: "GCP Managed",
      cost: "Moderate",
      price: 22,
      timeToMarket: "Low",
      timeToMarketDays: 7,   // Up from 2, BigQuery setup + data transformations + dataset creation
      complexity: "Moderate"
    },
    {
      component: "Exploratory Data Analysis",
      technology: "Databricks Managed",
      cost: "Moderate",
      price: 35,
      timeToMarket: "Low",
      timeToMarketDays: 5,   // Up from 2, cluster + notebook environment config, plus data ingestion
      complexity: "Moderate"
    },
    {
      component: "Exploratory Data Analysis",
      technology: "Self-Hosted",
      cost: "Low",
      price: 15,
      timeToMarket: "Moderate",
      timeToMarketDays: 14,  // Increased from 14 to 30, installing Jupyter/Spark, environment quirks, debugging
      complexity: "Moderate"
    },
  
    // 7) Dashboards / BI
    {
      component: "Dashboards / BI",
      technology: "AWS Managed",
      cost: "Moderate",
      price: 35,
      timeToMarket: "Low",
      timeToMarketDays: 7,  // Up from 3, setting up QuickSight, user roles, initial dashboard design
      complexity: "Low"
    },
    {
      component: "Dashboards / BI",
      technology: "Azure Managed",
      cost: "Moderate",
      price: 40,
      timeToMarket: "Low",
      timeToMarketDays: 7,
      complexity: "Low"
    },
    {
      component: "Dashboards / BI",
      technology: "GCP Managed",
      cost: "Moderate",
      price: 35,
      timeToMarket: "Low",
      timeToMarketDays: 7,
      complexity: "Low"
    },
    {
      component: "Dashboards / BI",
      technology: "Databricks Managed",
      cost: "Moderate",
      price: 45,
      timeToMarket: "Low",
      timeToMarketDays: 5, 
      complexity: "Low"
    },
    {
      component: "Dashboards / BI",
      technology: "Self-Hosted",
      cost: "Low",
      price: 20,
      timeToMarket: "Moderate",
      timeToMarketDays: 14,  // Increased from 14 to 30, open-source BI tools + integration can be non-trivial
      complexity: "Low"
    }
  ];
  
  export default lakehouseMatrix;
  