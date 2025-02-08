import AppError from "../utils/AppError.js";
import Order from "../models/Order.js";

const suggestOptimization = async (req, res, next) => {
  try {
    const orders = await Order.find();
    const maxWeight = 200;
    const alpha = 500; // Coût fixe par camion
    const beta = 100; // Coût lié au temps d'attente

    let bestCombination = null;
    let bestCost = Infinity;

    // Fonction pour calculer la distance (à remplacer par une logique réelle)
    const calculateDistance = (city1, city2) => {
      // Exemple de distances aléatoires
      const distances = {
        Alger: {
          Chlef: 200,
          Oran: 432,
          Annaba: 600,
          Constantine: 500,
          Tlemcen: 600,
          Batna: 450,
          Setif: 300,
          Blida: 45,
          Béjaïa: 250,
          "Tizi Ouzou": 100,
        },
        Chlef: {
          Alger: 200,
          Oran: 300,
          Annaba: 700,
          Constantine: 650,
          Tlemcen: 400,
          Batna: 600,
          Setif: 450,
          Blida: 230,
          Béjaïa: 500,
          "Tizi Ouzou": 150,
        },
        Oran: {
          Alger: 432,
          Chlef: 300,
          Annaba: 850,
          Constantine: 800,
          Tlemcen: 70,
          Batna: 850,
          Setif: 600,
          Blida: 370,
          Béjaïa: 700,
          "Tizi Ouzou": 450,
        },
        Annaba: {
          Alger: 600,
          Chlef: 700,
          Oran: 850,
          Constantine: 50,
          Tlemcen: 900,
          Batna: 180,
          Setif: 150,
          Blida: 550,
          Béjaïa: 450,
          "Tizi Ouzou": 400,
        },
        Constantine: {
          Alger: 500,
          Chlef: 650,
          Oran: 800,
          Annaba: 50,
          Tlemcen: 850,
          Batna: 80,
          Setif: 130,
          Blida: 450,
          Béjaïa: 350,
          "Tizi Ouzou": 300,
        },
        Tlemcen: {
          Alger: 600,
          Chlef: 400,
          Oran: 70,
          Annaba: 900,
          Constantine: 850,
          Batna: 850,
          Setif: 650,
          Blida: 530,
          Béjaïa: 780,
          "Tizi Ouzou": 600,
        },
        Batna: {
          Alger: 450,
          Chlef: 600,
          Oran: 850,
          Annaba: 180,
          Constantine: 80,
          Tlemcen: 850,
          Setif: 250,
          Blida: 420,
          Béjaïa: 330,
          "Tizi Ouzou": 250,
        },
        Setif: {
          Alger: 300,
          Chlef: 450,
          Oran: 600,
          Annaba: 150,
          Constantine: 130,
          Tlemcen: 650,
          Batna: 250,
          Blida: 300,
          Béjaïa: 170,
          "Tizi Ouzou": 230,
        },
        Blida: {
          Alger: 45,
          Chlef: 230,
          Oran: 370,
          Annaba: 550,
          Constantine: 450,
          Tlemcen: 530,
          Batna: 420,
          Setif: 300,
          Béjaïa: 200,
          "Tizi Ouzou": 60,
        },
        Béjaïa: {
          Alger: 250,
          Chlef: 500,
          Oran: 700,
          Annaba: 450,
          Constantine: 350,
          Tlemcen: 780,
          Batna: 330,
          Setif: 170,
          Blida: 200,
          "Tizi Ouzou": 70,
        },
        "Tizi Ouzou": {
          Alger: 100,
          Chlef: 150,
          Oran: 450,
          Annaba: 400,
          Constantine: 300,
          Tlemcen: 600,
          Batna: 250,
          Setif: 230,
          Blida: 60,
          Béjaïa: 70,
        },
      };

      return distances[city1][city2] || 0;
    };

    // Fonction pour calculer le coût d'une combinaison
    const calculateCost = (orders) => {
      if (orders.length === 0) return Infinity;

      const totalWeight = orders.reduce((sum, order) => sum + order.weight, 0);
      if (totalWeight > maxWeight) return Infinity;

      const destinations = orders.map((order) => order.destination);
      const departure = orders[0].departure;

      // Calcul de la distance totale
      let totalDistance = 0;
      let currentCity = departure;
      const sortedDestinations = destinations.sort(
        (a, b) =>
          calculateDistance(currentCity, a) - calculateDistance(currentCity, b)
      );
      sortedDestinations.forEach((dest) => {
        totalDistance += calculateDistance(currentCity, dest);
        currentCity = dest;
      });

      // Calcul du temps d'attente (simplifié)
      const maxTime = Math.max(
        ...orders.map((order) => order.departureTime.getTime())
      );
      const minTime = Math.min(
        ...orders.map((order) => order.departureTime.getTime())
      );
      const waitingTime = Math.abs(maxTime - minTime);

      // Coût total
      console.log(alpha + beta * waitingTime + totalDistance);
      return alpha + beta * waitingTime + totalDistance;
    };

    // Générer toutes les combinaisons possibles
    for (let i = 0; i < orders.length; i++) {
      for (let j = i + 1; j < orders.length; j++) {
        const combination = [orders[i], orders[j]];
        console.log("here we go");
        const cost = calculateCost(combination);

        if (cost < bestCost) {
          bestCost = cost;
          bestCombination = combination;
        }
      }
    }

    // Vérifier si une combinaison a été trouvée
    if (bestCombination) {
      res
        .status(200)
        .json({ optimizedOrders: bestCombination, estimatedCost: bestCost });
    } else {
      res.status(200).json({ message: "No optimization found" });
    }
  } catch (error) {
    next(error);
  }
};

const confirmOptimization = async (req, res, next) => {
    try {
        const { optimizedOrders } = req.body;

        if (!optimizedOrders || optimizedOrders.length === 0) {
            return res.status(400).json({ message: "No optimized orders provided" });
        }

        // Calculer le poids total et déterminer les destinations intermédiaires et finale
        const totalWeight = optimizedOrders.reduce((sum, order) => sum + order.weight, 0);
        const departure = optimizedOrders[0].departure;
        const destinations = optimizedOrders.map(order => order.destination);

        // Créer un nouvel ordre avec les destinations intermédiaires et finale
        const newOrder = new Order({
            client: "Combined Order", // Vous pouvez ajuster ce champ selon vos besoins
            weight: totalWeight,
            departure: departure,
            destination: destinations[destinations.length - 1], // La destination finale
            intermediateDestinations: destinations.slice(0, -1), // Destinations intermédiaires
            truck: optimizedOrders[0].truck, // Utiliser le camion de la première commande
            truckMaxWeight: optimizedOrders[0].truckMaxWeight,
            status: "assigned",
            departureTime: optimizedOrders[0].departureTime
        });

        // Supprimer les commandes d'origine
        const orderIds = optimizedOrders.map(order => order._id);
        await Order.deleteMany({ _id: { $in: orderIds } });

        // Enregistrer le nouvel ordre
        await newOrder.save();

        res.status(200).json({ message: "Optimization confirmed", newOrder });
    } catch (error) {
        next(error);
    }
};

export default { suggestOptimization, confirmOptimization };
