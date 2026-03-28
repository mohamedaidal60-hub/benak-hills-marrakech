/**
 * Database client — via Vercel Serverless API routes
 * Neon PostgreSQL is accessed server-side only (api/leads.ts, api/offers.ts).
 * This module uses fetch() to call those routes from the browser.
 */

const API_BASE = '/api';

export const db = {
  // ─── LEADS ───────────────────────────────────────────────────────────────

  async getLeads() {
    const res = await fetch(`${API_BASE}/leads`);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async insertLead(lead: {
    name: string;
    email: string;
    phone: string;
    budget?: string;
    configuration?: string;
    message?: string;
    status?: string;
  }) {
    const res = await fetch(`${API_BASE}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async updateLeadStatus(id: string, status: string) {
    const res = await fetch(`${API_BASE}/leads`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async addNoteToLead(id: string, notes: string) {
    const res = await fetch(`${API_BASE}/leads`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, notes }),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async deleteLead(id: string) {
    const res = await fetch(`${API_BASE}/leads?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  // ─── OFFERS ──────────────────────────────────────────────────────────────

  async getOffers() {
    const res = await fetch(`${API_BASE}/offers`);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async insertOffer(offer: {
    title: string;
    description?: string;
    price: string;
    surface?: string;
    rooms?: string;
    type?: string;
    features?: string;
    images?: string[];
    active?: boolean;
  }) {
    const res = await fetch(`${API_BASE}/offers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(offer),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async updateOffer(id: string, offer: {
    title: string;
    description?: string;
    price: string;
    surface?: string;
    rooms?: string;
    type?: string;
    features?: string;
    images?: string[];
    active?: boolean;
  }) {
    const res = await fetch(`${API_BASE}/offers`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...offer }),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async deleteOffer(id: string) {
    const res = await fetch(`${API_BASE}/offers?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
};
