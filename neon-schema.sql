-- ═══════════════════════════════════════════════════════════════════════════
-- Benak Hills — Neon PostgreSQL Schema
-- Run this in your Neon SQL Editor to initialize the database
-- ═══════════════════════════════════════════════════════════════════════════

-- ── Leads table ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id            UUID        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT        NOT NULL,
  email         TEXT        NOT NULL,
  phone         TEXT        NOT NULL,
  budget        TEXT        NOT NULL DEFAULT '',
  configuration TEXT        NOT NULL DEFAULT '',
  message       TEXT        NOT NULL DEFAULT '',
  status        TEXT        NOT NULL DEFAULT 'nouveau',
  notes         TEXT        NOT NULL DEFAULT '',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Offers table ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS offers (
  id          UUID        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT        NOT NULL,
  description TEXT        NOT NULL DEFAULT '',
  price       TEXT        NOT NULL,
  surface     TEXT        NOT NULL DEFAULT '',
  rooms       TEXT        NOT NULL DEFAULT '',
  type        TEXT        NOT NULL DEFAULT 'villa',
  features    TEXT        NOT NULL DEFAULT '',
  images      JSONB       NOT NULL DEFAULT '[]',
  active      BOOLEAN     NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Auto-update updated_at ───────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER offers_updated_at
  BEFORE UPDATE ON offers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
