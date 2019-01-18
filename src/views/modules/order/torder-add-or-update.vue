<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="店铺id" prop="shopId">
      <el-input v-model="dataForm.shopId" placeholder="店铺id"></el-input>
    </el-form-item>
    <el-form-item label="买家id" prop="buyerId">
      <el-input v-model="dataForm.buyerId" placeholder="买家id"></el-input>
    </el-form-item>
    <el-form-item label="订单号" prop="orderSn">
      <el-input v-model="dataForm.orderSn" placeholder="订单号"></el-input>
    </el-form-item>
    <el-form-item label="(订单状态 0未确认；1已确认; 2已完成；3已取消)" prop="orderStatus">
      <el-input v-model="dataForm.orderStatus" placeholder="(订单状态 0未确认；1已确认; 2已完成；3已取消)"></el-input>
    </el-form-item>
    <el-form-item label="(订单状态 0 未下单；1 已下单；2 商家确认收货；3 买家确认收货；4 违约)" prop="shopOrderStatus">
      <el-input v-model="dataForm.shopOrderStatus" placeholder="(订单状态 0 未下单；1 已下单；2 商家确认收货；3 买家确认收货；4 违约)"></el-input>
    </el-form-item>
    <el-form-item label="收货地址id" prop="receiverId">
      <el-input v-model="dataForm.receiverId" placeholder="收货地址id"></el-input>
    </el-form-item>
    <el-form-item label="待收货人地址id" prop="insteadReceiverId">
      <el-input v-model="dataForm.insteadReceiverId" placeholder="待收货人地址id"></el-input>
    </el-form-item>
    <el-form-item label="订单总价" prop="totalPrice">
      <el-input v-model="dataForm.totalPrice" placeholder="订单总价"></el-input>
    </el-form-item>
    <el-form-item label="运费" prop="postFee">
      <el-input v-model="dataForm.postFee" placeholder="运费"></el-input>
    </el-form-item>
    <el-form-item label="优惠" prop="preferential">
      <el-input v-model="dataForm.preferential" placeholder="优惠"></el-input>
    </el-form-item>
    <el-form-item label="附言" prop="memo">
      <el-input v-model="dataForm.memo" placeholder="附言"></el-input>
    </el-form-item>
    <el-form-item label="发票名称" prop="invoiceTitle">
      <el-input v-model="dataForm.invoiceTitle" placeholder="发票名称"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remarks">
      <el-input v-model="dataForm.remarks" placeholder="备注"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createDate">
      <el-input v-model="dataForm.createDate" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="删除标识" prop="delFlag">
      <el-input v-model="dataForm.delFlag" placeholder="删除标识"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          shopId: '',
          buyerId: '',
          orderSn: '',
          orderStatus: '',
          shopOrderStatus: '',
          receiverId: '',
          insteadReceiverId: '',
          totalPrice: '',
          postFee: '',
          preferential: '',
          memo: '',
          invoiceTitle: '',
          remarks: '',
          createDate: '',
          delFlag: ''
        },
        dataRule: {
          shopId: [
            { required: true, message: '店铺id不能为空', trigger: 'blur' }
          ],
          buyerId: [
            { required: true, message: '买家id不能为空', trigger: 'blur' }
          ],
          orderSn: [
            { required: true, message: '订单号不能为空', trigger: 'blur' }
          ],
          orderStatus: [
            { required: true, message: '(订单状态 0未确认；1已确认; 2已完成；3已取消)不能为空', trigger: 'blur' }
          ],
          shopOrderStatus: [
            { required: true, message: '(订单状态 0 未下单；1 已下单；2 商家确认收货；3 买家确认收货；4 违约)不能为空', trigger: 'blur' }
          ],
          receiverId: [
            { required: true, message: '收货地址id不能为空', trigger: 'blur' }
          ],
          insteadReceiverId: [
            { required: true, message: '待收货人地址id不能为空', trigger: 'blur' }
          ],
          totalPrice: [
            { required: true, message: '订单总价不能为空', trigger: 'blur' }
          ],
          postFee: [
            { required: true, message: '运费不能为空', trigger: 'blur' }
          ],
          preferential: [
            { required: true, message: '优惠不能为空', trigger: 'blur' }
          ],
          memo: [
            { required: true, message: '附言不能为空', trigger: 'blur' }
          ],
          invoiceTitle: [
            { required: true, message: '发票名称不能为空', trigger: 'blur' }
          ],
          remarks: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
          ],
          createDate: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          delFlag: [
            { required: true, message: '删除标识不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/order/torder/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.shopId = data.torder.shopId
                this.dataForm.buyerId = data.torder.buyerId
                this.dataForm.orderSn = data.torder.orderSn
                this.dataForm.orderStatus = data.torder.orderStatus
                this.dataForm.shopOrderStatus = data.torder.shopOrderStatus
                this.dataForm.receiverId = data.torder.receiverId
                this.dataForm.insteadReceiverId = data.torder.insteadReceiverId
                this.dataForm.totalPrice = data.torder.totalPrice
                this.dataForm.postFee = data.torder.postFee
                this.dataForm.preferential = data.torder.preferential
                this.dataForm.memo = data.torder.memo
                this.dataForm.invoiceTitle = data.torder.invoiceTitle
                this.dataForm.remarks = data.torder.remarks
                this.dataForm.createDate = data.torder.createDate
                this.dataForm.delFlag = data.torder.delFlag
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/order/torder/update`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'shopId': this.dataForm.shopId,
                'buyerId': this.dataForm.buyerId,
                'orderSn': this.dataForm.orderSn,
                'orderStatus': this.dataForm.orderStatus,
                'shopOrderStatus': this.dataForm.shopOrderStatus,
                'receiverId': this.dataForm.receiverId,
                'insteadReceiverId': this.dataForm.insteadReceiverId,
                'totalPrice': this.dataForm.totalPrice,
                'postFee': this.dataForm.postFee,
                'preferential': this.dataForm.preferential,
                'memo': this.dataForm.memo,
                'invoiceTitle': this.dataForm.invoiceTitle,
                'remarks': this.dataForm.remarks,
                'createDate': this.dataForm.createDate,
                'delFlag': this.dataForm.delFlag
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
