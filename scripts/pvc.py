import numpy as np
import networkx as nx
import itertools
import sys
import json

def brute_force_tsp(graph):
    # Get the list of nodes (cities)
    nodes = list(graph.nodes())
    
    # Remove the starting node (since it's a cycle, we can fix the starting point)
    start_node = nodes[0]
    remaining_nodes = nodes[1:]
    
    # Initialize the minimum distance to a large value
    min_distance = float('inf')
    best_path = None
    
    # Generate all possible permutations of the remaining nodes
    for permutation in itertools.permutations(remaining_nodes):
        # Construct the full path (starting and ending at the start node)
        path = (start_node,) + permutation + (start_node,)
        
        # Calculate the total distance of the path
        total_distance = 0
        for i in range(len(path) - 1):
            total_distance += graph[path[i]][path[i+1]]['cost']
        
        # Update the minimum distance and best path if this path is better
        if total_distance < min_distance:
            min_distance = total_distance
            best_path = path
    
    return best_path, min_distance

def get_user_input():
    if len(sys.argv) < 2:
        print("Usage: python pvc.py <input_file>")
        sys.exit(1)
    
    input_file = sys.argv[1]
    
    with open(input_file, 'r') as file:
        data = json.load(file)
    
    cities = data['cities']
    matrix = np.array(data['matrix'])
    
    return cities, matrix

cities, estimated_time_matrix = get_user_input()

# Matrice de corrélation entre trafic, météo et consommation
def generate_correlated_factors():
    mean = [1.0, 1.0, 10.0]  # Moyennes pour trafic, météo et consommation
    cov_matrix = [
        [0.1, 0.05, 0.02],  # Corrélation entre trafic et autres variables
        [0.05, 0.1, 0.03],  # Corrélation entre météo et autres variables
        [0.02, 0.03, 0.1]    # Corrélation entre consommation et autres variables
    ]
    return np.random.multivariate_normal(mean, cov_matrix)

# Fonction pour simuler les variations de conditions avec corrélations
def simulate_conditions(base_time):
    traffic_factor, weather_factor, fuel_consumption = generate_correlated_factors()
    adjusted_time = base_time * traffic_factor * weather_factor
    adjusted_fuel = (base_time / 100) * fuel_consumption
    return round(adjusted_time, 2), round(adjusted_fuel, 2)

# Génération des données de trajet
trip_data = []
for i in range(len(cities)):
    for j in range(len(cities)):
        if i != j:
            for _ in range(1000):  # 1000 simulations par arête
                adjusted_time, fuel_cost = simulate_conditions(estimated_time_matrix[i][j])
                trip_data.append([cities[i], cities[j], estimated_time_matrix[i][j], adjusted_time, fuel_cost])

# Précalcul des consommations moyennes par arête
edge_fuel_avg = {}
for trip in trip_data:
    key = (trip[0], trip[1])  # Clé : (départ, arrivée)
    if key not in edge_fuel_avg:
        edge_fuel_avg[key] = []
    edge_fuel_avg[key].append(trip[4])

# Calcul des moyennes
for key in edge_fuel_avg:
    edge_fuel_avg[key] = sum(edge_fuel_avg[key]) / len(edge_fuel_avg[key])

# Fonction pour estimer le coût d'une arête
def estimate_edge_cost(i, j):
    key = (cities[i], cities[j])
    av_fuel = edge_fuel_avg.get(key, 0)  # Si l'arête n'existe pas, utiliser 0
    return estimated_time_matrix[i][j] * 0.7 + av_fuel * 0.3

# Création du graphe complet
G = nx.complete_graph(len(cities))
    
for i, j in G.edges():
    G[i][j]['cost'] = estimate_edge_cost(i, j)

tsp_path,tsp_cost = brute_force_tsp(G)

print(json.dumps({
    "tsp_path": list(tsp_path),
    "tsp_cost": tsp_cost
})
)