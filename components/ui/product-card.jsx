"use client";

import Image from "next/image";
import { Expand, ShoppingCart } from "lucide-react";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";

const ProductCard = ({ id, name, price, images, category, size, color }) => {
  const data = { id, name, price, images, category, size, color };
  const router = useRouter();
  const previewModal = usePreviewModal();
  const cart = useCart();

  const handleClick = () => {
    router.push(`/product/${id}`);
  };
  const onPreview = (e) => {
    e.stopPropagation();

    previewModal.onOpen(data);
  };

  const onAddToCart = (e) => {
    e.stopPropagation();
    cart.addItem(data);
  };
  return (
    <div
      onClick={handleClick}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
    >
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={images?.[0].url}
          alt="image"
          fill
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      <div>
        <p className="font-semibold text-lg">{name}</p>
        <p className="text-sm text-gray-500">{category?.name}</p>
      </div>
      <div className="flex items-center justify-between">
        <Currency value={price} />
      </div>
    </div>
  );
};

export default ProductCard;
