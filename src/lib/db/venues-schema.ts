import {
  pgTable,
  serial,
  varchar,
  timestamp,
  text,
  boolean,
  integer,
  real,
} from "drizzle-orm/pg-core";

export const venues = pgTable("venues", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  phoneNumber: varchar("phone_number"),
  thoroughfare: varchar("thoroughfare"),
  locality: varchar("locality"),
  state: varchar("state"),
  postalCode: varchar("postal_code"),
  fullAddress: varchar("full_address"),
  wwozVenueHref: varchar("wwoz_venue_href"),
  website: varchar("website"),
  isActive: boolean("is_active").default(true),
  latitude: real("latitude"),
  longitude: real("longitude"),
  capacity: integer("capacity"),
  isIndoors: boolean("is_indoors").default(true),
  isStreaming: boolean("is_streaming").default(false),
  lastUpdated: timestamp("last_updated", { withTimezone: true }).defaultNow(),
  lastGeocoded: timestamp("last_geocoded", { withTimezone: true }),
  description: text("description"),
});

export type Venue = typeof venues.$inferSelect;
export type NewVenue = typeof venues.$inferInsert;