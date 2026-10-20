# Hình ảnh của món quà

Tạo bằng công cụ Imagegen tích hợp, không dùng CLI. Các ảnh cuối cùng nằm trong `dist/assets/`.

- `flowers.png`: Photorealistic edge-to-edge arrangement of blush roses, peonies, ivory roses, white hydrangeas, sage leaves; overlapping delicate petals, natural veins, soft cinematic light; no text, vase or watermark.
- `bouquet.png`: Full-length photorealistic bouquet of blush garden roses, peonies, ivory roses and hydrangeas, cream textured paper, champagne satin bow, complete ribbon tails and stems, isolated transparent background, soft golden light. Background removal pass preserves the entire bouquet and removes all surrounding backdrop.
- `garden.png`: Photorealistic wide golden-hour tulip garden with a central path. Exactly five Vietnamese family members fully visible from behind, left to right father, mother, tall eldest son, teenage daughter, youngest son, four continuous hand joins. Pink and ivory tulips, accurate anatomy, coherent light and shadows, no text or watermark.

- `rose.png`: One photorealistic blush garden rose head, isolated transparent background, delicate layered petals and natural veins, no stem or leaves. Used for thirty independently animated flowers thrown toward the camera, each with its own rotation, depth and delay.
- `garden-illustration.png`: Fine art watercolor and gouache tulip garden, warm ivory sky, exactly five Vietnamese family members viewed from behind holding hands, father–mother–eldest son–daughter–youngest son. Soft pastel brushwork and textured paper, accurate anatomy, no extra people or text. Final garden uses this illustration; the earlier photographic garden is retained as a source asset.

- `garden-simple.png`: Final garden, replacing the detailed watercolor. Extremely simple naive flat hand drawing, muted pastel fills, thin pencil outlines. Exactly five rear-view family figures holding hands, a small Vietnamese countryside house with terracotta roof, wooden door, two square windows, small tree, low hills, sparse tulip doodles. Cream empty upper space, no text, no photorealistic detail. Generated using built-in Imagegen.

Lời chúc trong thiệp là bản mẫu. Chữ ký tạm thời: “Con & anh”. Chưa có video tham khảo đính kèm. Theo yêu cầu chỉnh sửa, intro dùng hoa rời bay theo phối cảnh; toàn bộ quà nằm trong một màn hình với nội dung cuộn bên trong thiệp. Cảnh cuối dùng nét vẽ đơn giản và ngôi nhà quê. Bấm “Mở phong bì” để nắp lật lên, thiệp trượt ra và nằm phía trước phong bì. Chỉ hoa ở hai bên vườn lay nhẹ, nhóm gia đình đứng yên.

## Bản theo ảnh tham khảo mới

- `dist/assets/garden-reference.png`: Tạo bằng Imagegen tích hợp từ ảnh người dùng. Prompt: expand the supplied simple colored-pencil family illustration into a wide tulip garden; preserve five front-facing happy family members and four hand joins; small group lower right beside a cream countryside house with red tiled roof, green trees, receding tulip rows, empty warm ivory sky for the gift. No text, no watermark, no photorealistic rendering.
- Mở đầu hiển thị tranh, sau 3 giây kéo khung cảnh ra xa. Sau chuyển cảnh, bó hoa và phong bì hiện lần lượt. Sau 1,8 giây phong bì bắt đầu tự mở; nắp lật 1,5 giây, thư trượt ra 2,7 giây, lời chúc hiện theo đoạn.
- Gió lay lớp tán cây và hoa tiền cảnh, lá nhỏ bay ngang; gia đình giữ nguyên. Có hỗ trợ giảm chuyển động và xem lại toàn bộ cảnh.

## Cảnh SVG thay ảnh

Theo yêu cầu mới, cảnh gia đình và tulip hiện được dựng hoàn toàn bằng `dist/scene.js`, không dùng ảnh AI. SVG vẽ ngôi nhà mái ngói, cây, các luống tulip, năm người và bốn điểm nắm tay. Em út là bé trai áo vàng quần xanh. Cây và từng bông hoa có chuyển động gió riêng; cảnh được dựng lại theo kích thước viewport để giữ đủ gia đình trên mọi tỉ lệ. Các ảnh trước được giữ làm tài liệu nguồn, không xuất hiện trong cảnh hiện tại.

## Gia đình ảnh, vườn bằng code và gió theo cơn

Ảnh cuối: `dist/assets/family-cutout.png`, tạo bằng Imagegen tích hợp từ tranh tham khảo. Prompt: isolated transparent full-body family of exactly five, four hand joins, simple pencil illustration, father–mother–eldest son–daughter–youngest son; youngest clearly a short-haired boy wearing yellow shirt and blue shorts; all shoes visible, no flowers, house, text or watermark.

Ảnh gia đình là lớp riêng phía trước SVG tulip nên hoa không che người. Vườn và cây tiếp tục dùng code để chuyển động theo từng cơn mạnh–dịu. Lời chúc mẫu được rút gọn, thiệp không cuộn và tự điều chỉnh cỡ chữ theo vùng đọc.

## Thứ tự gia đình và bố cục vườn cuối

Thứ tự từ trái sang phải: anh – mẹ – em trai út – bố – em gái. Ảnh gia đình được tạo lại bằng Imagegen theo đúng thứ tự, bốn điểm nắm tay và trang phục bé út áo vàng, quần xanh. Vườn code có năm lớp tulip với kích cỡ tăng dần về tiền cảnh; ảnh gia đình nằm phía trước hoa để không bị che.

## Thu nhỏ tulip và đưa gia đình vào vườn

Tulip nhỏ hơn, chín lớp rải theo đường cong của triền đồi, kích thước tăng nhẹ về gần. Chừa lối đi quanh chỗ gia đình đứng. Ảnh gia đình thu còn 16% chiều cao màn hình, đặt sâu trên lối đi ở vị trí cách chân màn hình 12%, thay cho nhóm người lớn sát mép trước. Nhà và cây tiếp tục được giữ thoáng.

## Bỏ header và giới hạn vùng trồng hoa

Đã bỏ thanh header, chuyển nút xem lại về chân trang. Tăng vườn lên 14 lớp tulip nhỏ, trồng xen kẽ dày hơn. Mặt nạ SVG chỉ cho hoa hiển thị trên triền đất, loại trừ đường đi, mái và tường nhà, thân và tán cây cùng khoảng đứng của gia đình; chuyển động gió cũng bị giới hạn trong vùng trồng.

## Detailed painted garden (current)

Current scene: `dist/assets/garden-painted.png`, edited with integrated Imagegen from `garden-reference.png`. Prompt: preserve the reference colored-pencil illustration, detailed tiled countryside house, fence, trees, dense receding tulip beds, winding path and ivory sky. Change the five people to eldest brother, mother, youngest boy in yellow T-shirt and blue shorts, father, daughter; four hand joins, visible shoes, standing on the path in the lower-right garden. No text or watermark.

This integrated painting replaces the simplified SVG landscape and separate family cutout. Masked copies of tree and flower regions move subtly in gusts; the original family stays still. The scene pulls back before the bouquet and opening envelope appear.

## Current: code-only illustrations

All scene and bouquet imagery now comes from inline SVG in dist/scene.js. No raster illustration is referenced by the page or its CSS. The old PNGs are unused source history. The landscape fills the viewport, rebuilds on resize, and contains a tiled roof, wooden fence, layered trees, 19 tulip rows, a winding path, and the five family members in the requested order. Each tulip group animates around its stem base; tree groups move in gusts. A shared mask protects the path, house and family patch from flowers during motion. Reduced motion stops all wind and camera animation. The envelope and letter sequence remains unchanged.

## Final simplified garden

Per the latest request, the original bouquet.png and correctly ordered family-cutout.png are restored. House and winding path are removed. Only the tulips and distant greenery are drawn in code and animated in gusts. The family remains a small stable image within the garden, rendered above the flowers, with a small clear patch at their feet. No painted landscape background is loaded.

## Flowers only, family among the tulips

Trees and terrain shapes are removed. The original bouquet and family images stay. Tulips are split into back and front layers around the stable family image. Foreground flowers cover the lowest 12% of the family area (feet and ankles); a clip keeps the people above that level clear even in gusts. No empty foot patch, house, road, trees or hill remains.

## Hills, distant trees and bottom foliage

The final scene restores only the gentle hills and a distant row of code-drawn trees. The house and path remain removed. Code-drawn grass and leaves form the lowest foreground layer, while the front tulips continue to cover the family's feet so the five people stand within the flower garden. The trees, tulips and bottom leaves sway independently in gusts.

## Large family intro and full tulip stems

The opening camera is centered on the family and starts at 2.35x on wide screens, then eases back for 3.4 seconds before the gift appears. The generic bottom foliage has been removed. The lowest layer is now a dedicated row of complete tulips with visible stems and leaves, rendered in front of the family's feet. Tulip movement runs on 19 row groups and reuses six SVG flower definitions instead of animating thousands of individual flower nodes.

## Left tulip accent and layered wind

Eighteen extra full-stem tulips form three staggered groups across the left 23% of the scene. Each group has a different period and phase, creating a wind wave from left to right without adding per-flower animation layers. The six drifting leaves now follow a longer curved path with GPU-friendly transforms.

The intro greeting is set as the primary display title with a balanced responsive size, a soft rise-in animation and the corrected Vietnamese Women's Day date, 20/10.

## Stable letter completion and small screens

The fold control is absolutely positioned outside the card's layout flow and appears only after the final paragraph animation finishes. Letter fitting runs again at that point and can reduce text to 9px on exceptionally short screens. Below 760px the gift becomes a one-column layout: compact bouquet row above a full-width envelope, with additional height breakpoints at 620px and 540px.

The mobile intro art now overscans the viewport by one pixel and uses a centered 2.05x zoom, preventing the right edge from exposing a white strip during the opening shot.

On screens up to 760px wide, the reveal is staged: the family scene comes first, the bouquet then fills about 80% of the viewport width, the bouquet settles into its compact row as the envelope appears, and only after the card finishes opening do the letter paragraphs animate in sequence.
