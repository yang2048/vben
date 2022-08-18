import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { setRoleStatus } from '/@/api/demo/system';
import { useMessage } from '/@/hooks/web/useMessage';

export const columns: BasicColumn[] = [
  {
    title: '配置名称',
    dataIndex: 'configName',
    width: 200,
  },
  {
    title: '参数键',
    dataIndex: 'configKey',
    width: 180,
  },
  {
    title: '参数值',
    dataIndex: 'configValue',
    width: 180,
  },
  {
    title: '参数类型',
    dataIndex: 'configType',
    width: 180,
  },
  {
    title: '状态',
    dataIndex: 'disable',
    width: 120,
    customRender: ({ record }: any) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === '1',
        checkedChildren: '已启用',
        unCheckedChildren: '已禁用',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? '1' : '0';
          const { createMessage } = useMessage();
          setRoleStatus(record.id, newStatus)
            .then(() => {
              record.status = newStatus;
              createMessage.success(`状态已更新`);
            })
            .catch(() => {
              createMessage.error('修改状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '创建时间',
    dataIndex: 'created',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'configName',
    label: '配置名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'configKey',
    label: '参数键',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'disable',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '禁用', value: '1' },
      ],
    },
    colProps: { span: 5 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'configType',
    label: '参数类型',
    component: 'RadioButtonGroup',
    defaultValue: '1',
    componentProps: {
      options: [
        { label: '系统', value: '1' },
        { label: '普通', value: '2' },
      ],
    },
  },
  {
    field: 'configName',
    label: '配置名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'configKey',
    label: '参数键',
    required: true,
    component: 'Input',
  },
  {
    field: 'configValue',
    label: '参数值',
    required: true,
    component: 'Input',
  },
  {
    field: 'disable',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
  },
  {
    label: '说明',
    field: 'remark',
    component: 'InputTextArea',
  },
];
