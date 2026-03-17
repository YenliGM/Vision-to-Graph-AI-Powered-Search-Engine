/**
 * @fileoverview Search Engine Service
 * Implements core graph traversal algorithms for the Vision-to-Graph system.
 * Designed with a focus on modularity, performance analysis, and robust error handling.
 */

/**
 * Service class responsible for executing pathfinding algorithms.
 * Supports Breadth-First Search (BFS), Depth-First Search (DFS), and Uniform Cost Search (UCS).
 */
export class SearchEngine {
    /**
     * @param {Object} graph - An adjacency list representing the graph.
     * Expected format: { "Node": [["Neighbor", weight], ...] }
     */
    constructor(graph) {
        this.validateGraph(graph);
        this.graph = graph;
    }

    /**
     * Private helper to ensure the graph structure is valid before processing.
     * @param {Object} graph 
     * @throws {Error} If the graph format is invalid.
     */
    validateGraph(graph) {
        if (!graph || typeof graph !== 'object' || Array.isArray(graph)) {
            throw new Error("[SEARCH ERROR] Invalid graph format provided to SearchEngine.");
        }
    }

    /**
     * BREADTH-FIRST SEARCH (BFS)
     * Strategy: Level-order traversal.
     * Use Case: Finding the shortest path in unweighted graphs.
     * Complexity: O(V + E) where V = vertices and E = edges.
     * * @param {string} start - The starting node identifier.
     * @param {string} goal - The target node identifier.
     * @returns {Object|null} Path results and evaluation metrics.
     */
    runBFS(start, goal) {
        if (!start || !goal) return null;
        if (!this.graph[start]) return null;

        let queue = [{ curr: start, path: [start] }];
        let visited = new Set([start]);
        let nodesEvaluated = 0;

        while (queue.length > 0) {
            const { curr, path } = queue.shift(); // FIFO operation
            nodesEvaluated++;

            if (curr === goal) {
                return { path, nodesEvaluated, algorithm: 'BFS' };
            }

            const neighbors = this.graph[curr] || [];
            for (const [neighbor] of neighbors) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    // Immutability practice: create a new array for the path
                    queue.push({ curr: neighbor, path: [...path, neighbor] });
                }
            }
        }
        return null;
    }

    /**
     * DEPTH-FIRST SEARCH (DFS)
     * Strategy: Exploring as deep as possible along branches.
     * Use Case: Exploring all possible configurations or solving puzzles.
     * Complexity: O(V + E).
     * * @param {string} start - The starting node identifier.
     * @param {string} goal - The target node identifier.
     * @returns {Object|null} Path results and evaluation metrics.
     */
    runDFS(start, goal) {
        if (!start || !goal || !this.graph[start]) return null;

        let stack = [{ curr: start, path: [start] }];
        let visited = new Set();
        let nodesEvaluated = 0;

        while (stack.length > 0) {
            const { curr, path } = stack.pop(); // LIFO operation

            if (!visited.has(curr)) {
                visited.add(curr);
                nodesEvaluated++;

                if (curr === goal) {
                    return { path, nodesEvaluated, algorithm: 'DFS' };
                }

                const neighbors = this.graph[curr] || [];
                // Reversing neighbor iteration order ensures parity with original search logic
                for (let i = neighbors.length - 1; i >= 0; i--) {
                    const [neighbor] = neighbors[i];
                    if (!visited.has(neighbor)) {
                        stack.push({ curr: neighbor, path: [...path, neighbor] });
                    }
                }
            }
        }
        return null;
    }

    /**
     * UNIFORM COST SEARCH (UCS)
     * Strategy: Expanding the lowest-cost node first.
     * Use Case: Finding the optimal path in weighted graphs (Dijkstra's variant).
     * Complexity: O(E log V) in standard implementations.
     * * @param {string} start - The starting node identifier.
     * @param {string} goal - The target node identifier.
     * @returns {Object|null} Path results, total cost, and evaluation metrics.
     */
    runUCS(start, goal) {
        if (!start || !goal || !this.graph[start]) return null;

        // Using a list-based Priority Queue simulation for JS environments
        let pq = [{ cost: 0, curr: start, path: [start] }];
        let visited = new Map();
        let nodesEvaluated = 0;

        while (pq.length > 0) {
            // Priority management: always process the node with the lowest cumulative cost
            pq.sort((a, b) => a.cost - b.cost);
            const { cost, curr, path } = pq.shift();

            // Optimization: ignore nodes if a cheaper path has already been found
            if (visited.has(curr) && visited.get(curr) <= cost) continue;
            
            visited.set(curr, cost);
            nodesEvaluated++;

            if (curr === goal) {
                return { path, cost, nodesEvaluated, algorithm: 'UCS' };
            }

            const neighbors = this.graph[curr] || [];
            for (const [neighbor, weight] of neighbors) {
                const totalCost = cost + (Number(weight) || 1);
                pq.push({ 
                    cost: totalCost, 
                    curr: neighbor, 
                    path: [...path, neighbor] 
                });
            }
        }
        return null;
    }
}