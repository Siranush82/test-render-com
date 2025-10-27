import express from 'express';
const router = express.Router();
let composers = [
    {
      id: 1,
      name: "Ludwig van Beethoven",
      birthYear: 1770,
      deathYear: 1827,
      nationality: "German",
      famousWorks: [
        "Symphony No. 5",
        "Für Elise",
        "Piano Sonata No. 14 (Moonlight Sonata)"
      ],
      bio: "Beethoven gilt als Brückenfigur zwischen der Klassik und der Romantik."
    },
    {
      id: 2,
      name: "Johann Sebastian Bach",
      birthYear: 1685,
      deathYear: 1750,
      nationality: "German",
      famousWorks: [
        "Brandenburg Concertos",
        "Toccata and Fugue in D minor",
        "The Well-Tempered Clavier"
      ],
      bio: "Bach war ein deutscher Komponist und Organist des Barock, bekannt für seine kontrapunktischen Meisterwerke."
    },
    {
      id: 3,
      name: "Wolfgang Amadeus Mozart",
      birthYear: 1756,
      deathYear: 1791,
      nationality: "Austrian",
      famousWorks: [
        "The Magic Flute",
        "Eine kleine Nachtmusik",
        "Requiem"
      ],
      bio: "Mozart war ein österreichischer Komponist, dessen Werk zu den bedeutendsten der Klassik zählt."
    }
  ];
  
router.use(express.json());



// Alle Komponisten abrufen
router.get("/", (req, res) => {
  res.json(composers);
});

// Komponist nach ID abrufen
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const composer = composers.find(c => c.id === id);
  if (!composer) {
    return res.status(404).json({ message: "Composer not found" });
  }
  res.json(composer);
});

// Neuen Komponisten hinzufügen
router.post("/", (req, res) => {
  const newComposer = req.body;
  newComposer.id = composers.length
    ? composers[composers.length - 1].id + 1
    : 1;
  composers.push(newComposer);
  res.status(201).json(newComposer);
});

// Komponist komplett ersetzen (PUT)
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = composers.findIndex(c => c.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Composer not found" });
  }
  composers[index] = { id, ...req.body };
  res.json(composers[index]);
});

// Komponist teilweise aktualisieren (PATCH)
router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const composer = composers.find(c => c.id === id);
  if (!composer) {
    return res.status(404).json({ message: "Composer not found" });
  }
  Object.assign(composer, req.body);
  res.json(composer);
});

// Komponist löschen
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = composers.findIndex(c => c.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Composer not found" });
  }
  const deleted = composers.splice(index, 1);
  res.json(deleted[0]);
});

// Alle Werke eines Komponisten abrufen
router.get("/:id/works", (req, res) => {
  const id = parseInt(req.params.id);
  const composer = composers.find(c => c.id === id);
  if (!composer) {
    return res.status(404).json({ message: "Composer not found" });
  }
  res.json(composer.famousWorks);
});

// Neues Werk zu einem Komponisten hinzufügen
router.post("/:id/works", (req, res) => {
  const id = parseInt(req.params.id);
  const composer = composers.find(c => c.id === id);
  if (!composer) {
    return res.status(404).json({ message: "Composer not found" });
  }

  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Missing 'title' in request body" });
  }

  composer.famousWorks.push(title);
  res.status(201).json(composer.famousWorks);
});
export default router;