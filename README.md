# Vision-to-Graph-AI-Powered-Search-Engine

Advanced AI pipeline integrating Gemini 2.0 Flash for graph extraction from images and deterministic search logic. Implements BFS, DFS, UCS, IDS &amp; Bidirectional Search with automated Graphviz tree visualization. A robust bridge between Computer Vision and Graph Theory.

# 🤖 Vision-to-Graph: AI-Powered Search Engine

# 📌 Project Overview
This repository contains a robust, end-to-end pipeline that bridges Computer Vision and Graph Theory. The system uses Google's Gemini 2.0 Flash to "see" and extract a directed, weighted graph from an image, then applies classic Search Algorithms to find the optimal path from a Start state to a Goal state.
It was designed to demonstrate how Generative AI can automate the formalization of abstract problems and solve them using deterministic computational logic.

# 🚀 Key Features

Multimodal Extraction: Automatically converts hand-drawn or digital graph images into Python Adjacency Lists.Search Algorithm Suite: Implements and compares 5 core search strategies:BFS (Breadth-First Search)DFS (Depth-First Search)UCS (Uniform Cost Search) - Guaranteed Path OptimalityIDS (Iterative Deepening Search)Bidirectional SearchDynamic Visualization: Generates and renders Search Expansion Trees using Graphviz for pedagogical and debugging purposes.Data Interoperability: Exports graph data to JSON and CSV for external analysis.Robust Error Handling: Features deep exception catching and fallback mechanisms for non-API environments.

# 🛠️ Architecture
The project is structured into three main layers:
  * Vision Layer: Interacts with the Gemini API to transcribe visual nodes and weights.
* Logic Layer: A specialized SearchEngine class that executes algorithms and tracks "Search Nodes" for tree reconstruction.
* Presentation Layer: Automates the creation of .png assets and summary reports.

# 📊 Sample Results: 
UCS (Uniform Cost Search)The system identifies the UCS as the optimal algorithm for this specific weighted graph, successfully finding the path with the minimum cost ($13$) while monitoring the number of nodes evaluated.

# 📁 Repository StructurePlaintext

├── main_notebook.ipynb    # Google Colab compatible script

├── results/               # Directory for generated assets

│   ├── bfs_tree.png       # Search tree visualizations

│   ├── ucs_tree.png

│   ├── graph_edges.csv    # Flat data export

│   └── graph_structure.json

└── README.md


⚙️ SetupClone the repo: 
* git clone https://github.com/your-username/vision-to-graph.gitInstall 
* dependencies: pip install google-genai graphviz pandas pillow
* Set your API Key: export GEMINI_API_KEY='your_key_here'Run the engine: python main.py

🤝 Contributing 
Contributions, issues, and feature requests are welcome! 
Feel free to check the issues page.

Developed with ❤️ by Yenli & Gemini AI
