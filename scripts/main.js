// Weighted graph as adjacency list
const graph = {
  A: { B: 2, C: 4 },
  B: { A: 2, C: 1, D: 7 },
  C: { A: 4, B: 1, E: 3 },
  D: { B: 7, E: 2, F: 1 },
  E: { C: 3, D: 2, G: 5 },
  F: { D: 1, G: 3 },
  G: { E: 5, F: 3 }
};

function dijkstra(graph, startNode, endNode) {
  let distances = {};
  let prev = {};
  let pq = new Set(Object.keys(graph));

  // Initialize distances
  for (let node in graph) {
    distances[node] = Infinity;
    prev[node] = null;
  }
  distances[startNode] = 0;

  while (pq.size) {
    // Get node with smallest distance
    let currentNode = [...pq].reduce((a, b) =>
      distances[a] < distances[b] ? a : b
    );

    pq.delete(currentNode);

    if (currentNode === endNode) break;

    for (let neighbor in graph[currentNode]) {
      let alt = distances[currentNode] + graph[currentNode][neighbor];
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        prev[neighbor] = currentNode;
      }
    }
  }

  // Reconstruct path
  let path = [];
  let u = endNode;
  while (u) {
    path.unshift(u);
    u = prev[u];
  }

  return {
    distance: distances[endNode],
    path: path
  };
}

document.getElementById("calculateBtn").addEventListener("click", () => {
  const fromNode = document.getElementById("fromNode").value;
  const toNode = document.getElementById("toNode").value;

  const placeholder = document.getElementById("placeholderBox");
  const resultBox = document.getElementById("resultBox");

  // Run Dijkstra
  const result = dijkstra(graph, fromNode, toNode);

  // Hide placeholder, show result
  placeholder.style.display = "none";
  resultBox.style.display = "block";

  if (result.distance === Infinity) {
    resultBox.innerHTML = `No path found from "${fromNode}" to "${toNode}".`;
  } else {
    resultBox.innerHTML = `
      From Node Name = "${fromNode}", To Node Name = "${toNode}": <br>
      ${result.path.join(" → ")} <br><br>
      Total Distance: ${result.distance}
    `;
  }
});


document.getElementById("clearBtn").addEventListener("click", () => {
  document.getElementById("resultBox").style.display = "none";
  document.getElementById("placeholderBox").style.display = "block";

  document.getElementById("fromNode").selectedIndex = 0;
  document.getElementById("toNode").selectedIndex = 0;
});

