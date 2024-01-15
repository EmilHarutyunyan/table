class Packer {
  constructor(w, h, s) {
    this.init(w, h, s);
  }

  init(w, h, s) {
    this.root = { x: 0, y: 0, w, h };
    this.space = s;
  }

  fit(blocks) {
    for (let n = 0; n < blocks.length; n++) {
      const block = blocks[n];
      const node = this.findNode(this.root, block.w, block.h);

      if (node) {
        block.fit = this.splitNode(node, block.w, block.h);
      }
    }
  }

  findNode(root, w, h) {
    if (root.used) {
      return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
    } else if (w <= root.w && h <= root.h) {
      return root;
    } else {
      return null;
    }
  }

  splitNode(node, w, h) {
    node.used = true;
    const space = this.space;
    node.down = { x: node.x, y: node.y + h+space, w: node.w, h: node.h - h - space };
    node.right = { x: node.x + w + space, y: node.y, w: node.w - w - space, h };
    return node;
  }
}
export default Packer;