import { useState, useRef } from "react";
import "./App.css";

export default function App() {
  const [mode, setMode] = useState(null);
  const actionRef = useRef(null);

  const facts = [
    "Recycling one aluminum can saves enough energy to run a TV for 3 hours.",
    "Planting one tree can absorb 22kg of CO₂ per year.",
    "Switching to LED bulbs reduces energy usage by 75%.",
    "Using public transport can reduce carbon footprint by 30%.",
  ];

  const randomFact = facts[Math.floor(Math.random() * facts.length)];

  if (mode === "private") return <PrivateMode onBack={() => setMode(null)} />;
  if (mode === "public") return <PublicMode setMode={setMode} />;
  if (mode === "addEvent")
    return <AddEventPage onBack={() => setMode("public")} />;

  return (
    <div>
      <div className="fact-banner">🌿 Did you know? {randomFact}</div>

      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Eco<span>Lens</span>
          </h1>
          <p className="hero-subtitle">
            Turning climate data into daily action.
          </p>

          <button
            className="hero-btn"
            onClick={() =>
              actionRef.current.scrollIntoView({ behavior: "smooth" })
            }
          >
            Start Your Journey
          </button>
        </div>
      </section>

      <section className="action-section" ref={actionRef}>
        <h2>Choose Your Mode</h2>

        <div className="mode-grid">
          <div className="mode-card-modern">
            <h3>Personal Habit Mode</h3>
            <p>Build sustainable habits based on your time & budget.</p>
            <button onClick={() => setMode("private")}>Enter</button>
          </div>

          <div className="mode-card-modern">
            <h3>Public Climate Events</h3>
            <p>Discover marathons, seminars, protests & workshops.</p>
            <button onClick={() => setMode("public")}>Explore</button>
          </div>
        </div>

        <div className="aqi-card-modern">
          <div className="aqi-header">
            <div className="aqi-icon">🌬️</div>
            <div>
              <h3>Air Quality</h3>
              <p className="aqi-sub">Local environmental health</p>
            </div>
          </div>

          <div className="aqi-circle">
            <span>78</span>
            <small>AQI</small>
          </div>

          <div className="aqi-badge">Moderate</div>
        </div>
      </section>
    </div>
  );
}

/* ================= PRIVATE MODE ================= */

function PrivateMode({ onBack }) {
  const [time, setTime] = useState("");
  const [budget, setBudget] = useState("");
  const [showResults, setShowResults] = useState(false);

  const habits = [
    {
      title: "Use Reusable Bags",
      time: 5,
      cost: 0,
      category: "Waste",
      impact: 3,
    },
    {
      title: "Shorter Showers",
      time: 10,
      cost: 0,
      category: "Water",
      impact: 4,
    },
    {
      title: "Plant-Based Meal",
      time: 30,
      cost: 200,
      category: "Carbon",
      impact: 5,
    },
    {
      title: "Switch to LED Bulbs",
      time: 15,
      cost: 500,
      category: "Energy",
      impact: 4,
    },
  ];

  const filtered = showResults
    ? habits.filter(
        (habit) =>
          (time === "" || habit.time <= Number(time)) &&
          (budget === "" || habit.cost <= Number(budget)),
      )
    : [];

  return (
    <div className="mode-wrapper">
      <h2>Personal Habit Finder</h2>

      <div className="input-group">
        <input
          type="number"
          placeholder="Available time (minutes)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <input
          type="number"
          placeholder="Available budget (₹)"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
      </div>

      <button className="primary-btn" onClick={() => setShowResults(true)}>
        Proceed
      </button>

      <div className="habit-grid">
        {filtered.map((habit, index) => (
          <div key={index} className="habit-card-modern">
            <div className="habit-header">
              <div className={`habit-badge ${habit.category.toLowerCase()}`}>
                {habit.category === "Waste" && "🗑️"}
                {habit.category === "Water" && "💧"}
                {habit.category === "Carbon" && "🌿"}
                {habit.category === "Energy" && "⚡"}
                <span>{habit.category}</span>
              </div>

              <div className="habit-impact-modern">
                <span className="impact-label">IMPACT</span>
                {"●".repeat(habit.impact)}
              </div>
            </div>

            <h3 className="habit-title">{habit.title}</h3>

            <p className="habit-desc">
              Take this small step to reduce environmental impact.
            </p>

            <div className="habit-divider" />

            <div className="habit-meta-modern">
              <span>💲 {habit.cost === 0 ? "Free" : habit.cost}</span>
              <span>🕒 {habit.time} min</span>
            </div>
          </div>
        ))}
      </div>

      <button className="back-btn" onClick={onBack}>
        Back
      </button>
    </div>
  );
}

/* ================= PUBLIC MODE ================= */

function PublicMode({ setMode }) {
  const [search, setSearch] = useState("");

  const events = [
    {
      title: "Run for Clean Air Marathon",
      location: "Kolkata",
      category: "Marathon",
      date: "10 March 2026",
    },
    {
      title: "Beach Cleanup Drive",
      location: "Mumbai",
      category: "Cleanup",
      date: "15 March 2026",
    },
  ];

  const filtered = events.filter(
    (event) =>
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase()) ||
      event.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="mode-wrapper">
      <h2>Public Climate Events</h2>

      <input
        type="text"
        placeholder="Search events"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        className="primary-btn"
        style={{ marginTop: "20px" }}
        onClick={() => setMode("addEvent")}
      >
        + Add Event
      </button>

      <div className="event-grid">
        {filtered.map((event, index) => (
          <div key={index} className="event-card">
            <h3>{event.title}</h3>
            <p>{event.location}</p>
            <p>{event.category}</p>
            <p>{event.date}</p>
          </div>
        ))}
      </div>

      <button className="back-btn" onClick={() => setMode(null)}>
        Back
      </button>
    </div>
  );
}

/* ================= ADD EVENT PAGE ================= */

function AddEventPage({ onBack }) {
  const [form, setForm] = useState({
    title: "",
    location: "",
    category: "",
    date: "",
    description: "",
  });

  const handleSubmit = () => {
    alert("Event submitted successfully! (Mock)");
    onBack();
  };

  return (
    <div className="mode-wrapper">
      <h2>Add New Climate Event</h2>

      <div className="event-form-large">
        <input
          placeholder="Event Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <input
          placeholder="Date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <textarea
          placeholder="Full Description of the Event"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <button className="primary-btn" onClick={handleSubmit}>
          Submit Event
        </button>
      </div>

      <button className="back-btn" onClick={onBack}>
        Cancel
      </button>
    </div>
  );
}
