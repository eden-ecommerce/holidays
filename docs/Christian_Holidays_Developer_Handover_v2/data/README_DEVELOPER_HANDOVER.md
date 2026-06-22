# Christian Holidays Directory - Developer Handover Package

This directory contains the foundational data, schemas, and strategic plans required to build the Christian Holidays Directory Platform. 

## Package Contents

### 1. Database Schema (`database_schema.json`)
A comprehensive JSON representation of the entire relational data model. This includes the core entities (`User`, `Provider`, `Listing`), the unique `ListingChristianMetadata` entity, transactional tables (`Review`, `Inquiry`), and content architecture (`Destination`, `PilgrimageRoute`, `BlogPost`). It also details the polymorphic nature of listings (Accommodation vs. Tour) and the tagging system.

### 2. Seed Data (CSV Files)
Structured data ready to be imported/seeded into the database. These files represent the initial inventory of the platform.

*   **`providers_tour_operators.csv`:** Data for 19 UK-based Christian tour operators, pilgrimage companies, and cruise providers (e.g., Richmond Holidays, McCabe Pilgrimages, Oak Hall).
*   **`providers_retreats_accommodation.csv`:** Data for 30 Christian retreat centres, monastic guest houses, and hotels (e.g., Lee Abbey, Capernwray Hall, Ampleforth Abbey).
*   **`providers_youth_activity.csv`:** Data for 15 youth camps and outdoor adventure centres (e.g., Scripture Union, Rock UK, CPAS Ventures).
*   **`providers_festivals_events.csv`:** Data for 21 major UK Christian festivals and conferences (e.g., Spring Harvest, Keswick Convention, Big Church Festival).
*   **`providers_self_catering_bnb.csv`:** Data for 8 directories, home swap platforms, and self-catering networks (e.g., HolyHols, CHACS).
*   **`destinations_pilgrimage_heritage.csv`:** Data for 20 domestic and international pilgrimage routes and heritage destinations (e.g., St Cuthbert's Way, Iona, Holy Land).
*   **`partners_media_associations.csv`:** Strategic data on 20 potential media partners, associations, and competitors for outreach and backlinking.

### 3. Strategic Documentation
*   **`../Christian_Holiday_Website_Development_Plan.md`:** The comprehensive functional and architectural plan, detailing the user journeys, provider portals, SEO strategy (Schema.org), and phased implementation roadmap.
*   **`../UK_Christian_Holiday_Market_Research_Expanded.md`:** The deep-dive market research report providing context on the target audience, keyword landscape, and industry trends.

## Next Steps for Development

1.  **Database Provisioning:** Use `database_schema.json` to create the PostgreSQL/MySQL schema. Pay special attention to the polymorphic relationships on the `Listing` table and the `ListingChristianMetadata` table, which is the platform's USP.
2.  **Data Seeding:** Write import scripts to parse the provided CSV files and populate the `Provider` and `Listing` tables. Note that some CSV fields will need to map to multiple relational tables (e.g., a row in `providers_retreats_accommodation.csv` will create a `Provider` record, a `Listing` record, and a `ListingAccommodationDetails` record).
3.  **API Development:** Build the REST/GraphQL endpoints to serve this data, prioritizing the semantic search and advanced filtering requirements outlined in the Development Plan.
4.  **Frontend Implementation:** Begin building the distinct user journeys (Traveller vs. Provider) as specified in the strategic documentation.
