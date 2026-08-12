export default {
  async fetch(request) {

    const url = new URL(request.url);

    const liveCategories = [
      {
        category_id: "88",
        category_name: "EU | SPAIN GENERALE",
        parent_id: 0
      },
      {
        category_id: "90",
        category_name: "EU | SPAIN SPORTS",
        parent_id: 0
      }
    ];

    const movieCategories = [
      {
        category_id: "981",
        category_name: "[ES] PELICULA 4K",
        parent_id: 0
      },
      {
        category_id: "982",
        category_name: "[ES] NUEVOS LANZAMIENTOS",
        parent_id: 0
      }
    ];

    const seriesCategories = [
      {
        category_id: "1562",
        category_name: "[ES] SERIES",
        parent_id: 0
      },
      {
        category_id: "1563",
        category_name: "[ES] NETFLIX",
        parent_id: 0
      }
    ];


    // ==========================================
    // PLAYER API
    // ==========================================

    if (url.pathname.endsWith("/player_api.php")) {

      const action =
        url.searchParams.get("action");


      // Información básica
      if (!action) {

        return json({
          user_info: {
            username: "test",
            status: "Active",
            auth: 1
          },

          server_info: {
            url: url.hostname,
            port: "443",
            https_port: "443"
          }
        });

      }


      // Categorías LIVE
      if (
        action === "get_live_categories"
      ) {

        return json(
          liveCategories
        );

      }


      // Categorías MOVIES
      if (
        action === "get_vod_categories"
      ) {

        return json(
          movieCategories
        );

      }


      // Categorías SERIES
      if (
        action === "get_series_categories"
      ) {

        return json(
          seriesCategories
        );

      }


      // LIVE de prueba
      if (
        action === "get_live_streams"
      ) {

        return json([
          {
            num: 1,
            name: "TEST SPORTS",
            stream_type: "live",
            stream_id: 1001,
            category_id: "90"
          }
        ]);

      }


      // MOVIE de prueba
      if (
        action === "get_vod_streams"
      ) {

        return json([
          {
            num: 1,
            name: "TEST MOVIE",
            stream_type: "movie",
            stream_id: 2001,
            category_id: "981"
          }
        ]);

      }


      // SERIES de prueba
      if (
        action === "get_series"
      ) {

        return json([
          {
            num: 1,
            name: "TEST SERIES",
            series_id: 3001,
            category_id: "1562"
          }
        ]);

      }


      return json([]);

    }


    // ==========================================
    // GET.PHP
    // ==========================================

    if (url.pathname.endsWith("/get.php")) {

      const m3u = `#EXTM3U

#EXTINF:-1 tvg-id="test-live" tvg-name="TEST SPORTS" group-title="EU | SPAIN SPORTS",TEST SPORTS
https://example.com/test-live

#EXTINF:-1 tvg-id="test-movie" tvg-name="TEST MOVIE" group-title="[ES] PELICULA 4K",TEST MOVIE
https://example.com/test-movie

#EXTINF:-1 tvg-id="test-series" tvg-name="TEST SERIES" group-title="[ES] SERIES",TEST SERIES
https://example.com/test-series
`;

      return new Response(
        m3u,
        {
          headers: {
            "Content-Type":
              "application/x-mpegURL; charset=utf-8"
          }
        }
      );

    }


    // ==========================================
    // PÁGINA PRINCIPAL
    // ==========================================

    return new Response(
      "XTREAM TEST API OK",
      {
        headers: {
          "Content-Type":
            "text/plain; charset=utf-8"
        }
      }
    );

  }
};


// ==========================================
// JSON
// ==========================================

function json(data) {

  return new Response(
    JSON.stringify(data),
    {
      headers: {
        "Content-Type":
          "application/json; charset=utf-8",

        "Access-Control-Allow-Origin":
          "*"
      }
    }
  );

}
